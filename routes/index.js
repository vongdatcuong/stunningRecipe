const express = require("express");
const ctrlMain = require("../controllers/main.js");
const router = express.Router();
const mainController = require('../controllers/main');
const userController = require('../controllers/user');

// passport
const passport = require('passport');
require('./passport.js');



/* GET Home page. */
router.get('/', mainController.home);

/* Login */
router.get('/login', userController.loginView);
router.post('/login', userController.login);

/* Sign up */
router.get('/signup', userController.signupView);
router.post('/signup', userController.signup);

/*logout*/
router.get('/logout', userController.logout);

/* Dishes */
router.get('/dishes', function(req, res) {
    res.render('dishes', {
        title: 'Stunning Recipe',
        user: req.user
    });
});

/* Dish detail */
router.get('/dish/:dishID', mainController.dishDetail);

/* Search */
router.get('/search', function(req, res) {
    res.render('search', {
        title: 'Stunning Recipe',
        user: req.user
    });
});

/* Advanced search */
router.get('/advanced_search', function(req, res) {
    res.render('advanced_search', {
        title: 'Stunning Recipe',
        user: req.user
    });
});

/* Post recipe */
router.get('/post_recipe', function(req, res) {
    res.render('post_recipe', {
        title: 'Stunning Recipe',
        user: req.user
    });
});

/* Profile */
router.get('/profile', userController.profile);

/* Your own Information */
router.get('/yourInfo', userController.yourInfo);

/* Edit Your own Information */
router.get('/editInfo', userController.editInfo);

/* Change password */
router.get('/changePwd', userController.changePwdView);
router.post('/changePwd', userController.changePwd);

router.get("/contact", ctrlMain.contact);

router.get("/about", ctrlMain.about);

router.get("/privacy", ctrlMain.privacy);

router.get("/terms", ctrlMain.terms);

router.get("/help", ctrlMain.help);

router.get("/faqs", ctrlMain.faqs);

module.exports = router;