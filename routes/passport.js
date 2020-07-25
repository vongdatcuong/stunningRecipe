const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('User');
const constant = require('../Utils/constant');

passport.use(new LocalStrategy(
    /*{ passReqToCallback: true },
        function(req, username, password, done) {
            User.findOne({ username: username, type: { $eq: constant.type["customer"] } }, function(err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Username không tồn tại.' });
                }
                if (!user.isActive) {
                    return done(null, false, { message: 'Tài khoản đã bị khóa.' });
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result !== true) {
                        return done(null, false, { message: 'Mật khẩu không đúng.' });
                    } else {
                        return done(null, user);
                    }
                })

            });
        }*/
    (username, password, done) => { //các tên - name trường cần nhập, đủ tên trường thì Done 
        if (username == 'nhoxtheanh@gmail.com') { //kiểm tra giá trị trường có name là username
            if (password == 12345) { // kiểm tra giá trị trường có name là password
                return done(null, username); //trả về username
            } else {
                return done(null, false); // chứng thực lỗi
            }
        } else {
            return done(null, false); //chứng thực lỗi
        }
    }
));


// format - mã hóa dữ liệu để có thể lưu trữ user vào session.
passport.serializeUser((username, done) => {
    done(null, username);
})

passport.deserializeUser((name, done) => {
    //tại đây hứng dữ liệu để đối chiếu
    if (name == 'nhoxtheanh@gmail.com') { //tìm xem có dữ liệu trong kho đối chiếu không
        return done(null, name)
    } else {
        return done(null, false)
    }
})