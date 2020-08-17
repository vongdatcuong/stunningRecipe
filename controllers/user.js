// passport
const passport = require("passport");
const bcrypt = require("bcryptjs");
require("../routes/passport.js");
var path = require('path');
const fs = require("fs");
const requireLogin = require("./../middlewares/auth.mdw");
const constant = require("../Utils/constant");

const User = require("../models/user");
const Dish = require("../models/dish");

const loginView = async(req, res) => {
    res.render("login", {
        title: constant.appName,
        layout: false,
        error_messages: req.flash("error"),
        success_messages: req.flash("success"),
    });
};

const login = async(req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash("error", info.message);
            res.redirect("/login");
            return;
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            const url = req.query.retUrl || "/";
            return res.redirect(url);
        });
    })(req, res, next);
};

const signupView = async(req, res) => {
    res.render("signup", {
        title: constant.appName,
        layout: false,
        error_messages: req.flash("error"),
        success_messages: req.flash("success"),
    });
};

const signup = async(req, res, next) => {
    try {
        let username = await User.findUsername(req.body.username);
        if (username) {
            res.render("signup", {
                title: "Đăng ký",
                layout: false,
                error_messages: "Tên đăng nhập đã tồn tại !!!",
            });
        } else {
            const result = await User.addUser(
                req.body.firstName,
                req.body.lastName,
                req.body.username,
                req.body.email,
                req.body.phone,
                req.body.password
            );

            req.flash(
                "success",
                "Đăng ký tài khoản thành công. Chào mừng bạn đến với Stunning Recipe"
            );
            res.redirect("/login");
        }
    } catch (error) {
        next(error);
    }
};

const logout = async(req, res) => {
    req.logOut();
    res.redirect("/");
};

const profile = async(req, res) => {
    const profileUserID = req.params.id; // ID của user đang được xem profile
    var loginUserID;
    if (req.isAuthenticated()) {
        loginUserID = req.user.userID; // ID của user đang đăng nhập
    } else loginUserID = -1;

    const userProfile = await User.getUser(profileUserID);
    //////////////////////////////////////////////////////////////////////////////////////////////////
    // Lấy ảnh đại diện
    userProfile.avatarUrl = () => constant.imageStorageLink + constant.userPath + userProfile.avatar;
    // Lấy dữ liệu các bài viết
    const customDishTypes = constant.dishTypes.map((item, idx) => {
        return { name: item, index: (idx) };
    });
    const customCuisines = constant.cuisines.map((item, idx) => {
        return { name: item, index: idx };
    });
    const customDiets = constant.diets.map((item, idx) => {
        return { name: item, index: idx };
    });
    // lấy danh sách các món ăn đã post
    const postedDishes = await Dish.getDishes({ // query
        createdBy: profileUserID
    }, { // option
        sort: { createdDate: -1 },
        perPage: constant.homePerPage,
        page: 1
    });

    const favoriteHashMap = {};
    const allDishIDs = [
        ...postedDishes.map((dish, index) => dish.dishID)
    ];
    if (req.user) {
        const userFavoriteDishes = await User.getUserFavoriteDishes(req.user.userID, allDishIDs);
        userFavoriteDishes.forEach((favDish, index) => {
            favoriteHashMap[favDish.dishID] = 1
        });
    }
    postedDishes.forEach((dish) => {
        dish.imageUrl = () => constant.imageStorageLink + constant.dishPath + dish.image;
        dish.isUserFavorite = favoriteHashMap[dish.dishID] != undefined;
        dish.dishTypesStr = dish.dishTypes.map((item, idx) => constant.dishTypes[item.dishTypeID]).join(constant.commaSpace);
        dish.cuisinesStr = dish.cuisines.map((item, idx) => constant.cuisines[item.cuisineID]).join(constant.commaSpace);
        dish.dietsStr = dish.diets.map((item, idx) => constant.diets[item.dietID]).join(constant.commaSpace);
    });
    // Lấy dữ liệu món ăn yêu thích

    //////////////////////////////////////////////////////////////////////////////////////////////////

    res.render("profile", {
        title: constant.appName,
        user: req.user,
        userProfile: userProfile,
        postedDishes: postedDishes,
        postedDishesCount: postedDishes.length,
        dishTypes: constant.splitToChunk(customDishTypes, 6),
        cuisines: customCuisines,
        diets: customDiets,
    });
};

const yourInfo = async(req, res) => {
    if (req.isAuthenticated()) {
        //trả về true nếu đã đăng nhập rồi
        const userInfo = await User.getUser(req.user.userID);
        userInfo.avatarUrl = () => constant.imageStorageLink + constant.userPath + userInfo.avatar;
        res.render("yourInfo", {
            title: constant.appName,
            user: req.user,
            userInfo: userInfo,
        });
    } else {
        res.redirect("/login");
    }
};

const editInfoView = async(req, res) => {
    if (req.isAuthenticated()) {
        const userInfo = await User.getUser(req.user.userID);
        userInfo.avatarUrl = () => constant.imageStorageLink + constant.userPath + userInfo.avatar;
        res.render("editInfo", {
            title: constant.appName,
            user: req.user,
            userInfo: userInfo,
        });
    } else {
        res.redirect("/login");
    }
};

const editInfo = async(req, res) => {
    if (!req.isAuthenticated()) {
        res.redirect("/login");
    } else {
        try {
            const info = {
                firstName: req.body.firstName || "",
                lastName: req.body.lastName || "",
                gender: req.body.gender || "",
                email: req.body.email || "",
                birthDate: req.body.birthDate || "",
                phone: req.body.phone || "",
                address: req.body.address || "",
            };
            const user = await User.setUserInfo(req.user.userID, info);
            if (user) {
                res.redirect("/yourInfo");
            } else {
                res.redirect("/error");
            }
        } catch (err) {
            console.log("err", err);
        }
    }
};

const uploadUserImageCtrl = async(req, res) => {
    try {
        const userID = (req.user.userID) ? parseInt(req.user.userID) : -1;
        //const imageUrl = req.body.imageUrl;
        var imageUrl = req.file.originalname || "avatar_default.png";
        try {
            const url = await User.uploadUserImageModel(userID, req.file); // trả về url của blob vừa được upload
            imageUrl = url;
        } catch (err) {
            res.json({
                error: "Upload ảnh thất bại 1"
            })
        }
        var finalImageUrl = imageUrl.slice(imageUrl.lastIndexOf('/') + 1); // lấy ra file name để gắn vào User.avatar model
        const setUrlResult = await User.setUserUrlImage(userID, finalImageUrl);
        res.redirect("/editInfo");
    } catch (err) {
        res.json({
            error: "Upload ảnh thất bại 2"
        })
    }
}

const changePwdView = async(req, res) => {
    if (req.isAuthenticated()) {
        res.render("changePwd", {
            title: constant.appName,
            layout: false,
            error_messages: req.flash("error"),
            success_messages: req.flash("success"),
            user: req.user,
        });
    } else {
        res.redirect("/login");
    }
};

const changePwd = async(req, res, next) => {
    try {
        const pwdOld = req.body.passwordOld;
        const pwdNew = req.body.password;

        var user = null;
        if (req.isAuthenticated) {
            user = req.user;
        } else {
            res.redirect("/login");
            return;
        }
        const temp = bcrypt.compareSync(pwdOld, user.password);
        if (!temp) {
            req.flash("error", "Sai mật khẩu.");
            res.redirect("/changePwd");
            return;
        }
        const result = await User.setPassword(user.userID, pwdNew);
        req.flash(
            "success",
            "Đổi mật khẩu thành công, bây giờ bạn có thể đăng nhập lại."
        );
        res.redirect("/login");
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginView,
    login,
    signupView,
    signup,
    logout,
    profile,
    yourInfo,
    editInfoView,
    editInfo,
    uploadUserImageCtrl,
    changePwdView,
    changePwd,
};