// passport
const passport = require('passport');
require('../routes/passport.js');

const User = require('../models/user');


const loginView = async(req, res) => {
    res.render('login', {
        title: 'Stunning Recipe',
        layout: false,
        error_messages: req.flash('error'),
        success_messages: req.flash('success')
    });
}

const login = async(req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash('error', info.message);
            res.redirect('/login');
            return;
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next)
}

const signupView = async(req, res) => {
    res.render('signup', {
        title: 'Stunning Recipe',
        layout: false,
        error_messages: req.flash('error'),
        success_messages: req.flash('success')
    });
}

const signup = async(req, res, next) => {
    try {
        let username = await User.findUsername(req.body.username);
        if (username) {
            res.render('signup', {
                title: 'Đăng ký',
                layout: false,
                error_messages: "Tên đăng nhập đã tồn tại !!!"
            });
        } else {
            const result = await User.addUser(req.body.firstName, req.body.lastName, req.body.username, req.body.email, req.body.phone, req.body.password);

            req.flash('success', 'Đăng ký tài khoản thành công. Chào mừng bạn đến với Stunning Recipe');
            res.redirect('/login');
        }
    } catch (error) {
        next(error);
    }
}

const logout = async(req, res) => {
    req.logOut();
    res.redirect('/');
};

const profile = async(req, res) => {
    res.render('profile', {
        title: 'Stunning Recipe',
        user: req.user
    });
}

const yourInfo = async(req, res) => {
    if (req.isAuthenticated()) { //trả về true nếu đã đăng nhập rồi
        res.render('yourInfo', {
            title: 'Stunning Recipe',
            user: req.user
        });
    } else {
        res.redirect('/login');
    }
}

const editInfo = async(req, res) => {
    if (req.isAuthenticated()) {
        res.render('editInfo', {
            title: 'Stunning Recipe',
            user: req.user
        });
    } else {
        res.redirect('/login');
    }
}

const changePwd = async(req, res) => {
    if (req.isAuthenticated()) {
        res.render('changePwd', {
            title: 'Stunning Recipe',
            layout: false,
            error_messages: req.flash('error'),
            success_messages: req.flash('success'),
            user: req.user
        });
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    loginView,
    login,
    signupView,
    signup,
    logout,
    profile,
    yourInfo,
    editInfo,
    changePwd
};