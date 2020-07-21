const express = require("express");
const ctrlMain = require("../controllers/main.js");
const router = express.Router();
const mainController = require('../controllers/main');

/* GET Home page. */
router.get('/', mainController.home);

/* Login */
router.get('/login', function(req, res) {
    res.render('login', {
        title: 'Stunning Recipe',
        layout: false
    });
});

/* Sign up */
router.get('/signup', function(req, res) {
    res.render('signup', {
        title: 'Stunning Recipe',
        layout: false
    });
});

/* Dishes */
router.get('/dishes', function(req, res) {
    res.render('dishes', {
        title: 'Stunning Recipe',
        user: {}
    });
});

/* Dish detail */
router.get('/dish_detail', function(req, res) {
    res.render('dish_detail', {
        title: 'Stunning Recipe',
        user: {}
    });
});

/* Search */
router.get('/search', function(req, res) {
    res.render('search', {
        title: 'Stunning Recipe',
        user: {}
    });
});

/* Advanced search */
router.get('/advanced_search', function(req, res) {
    res.render('advanced_search', {
        title: 'Stunning Recipe',
        user: {}
    });
});

/* Post recipe */
router.get('/post_recipe', function(req, res) {
    res.render('post_recipe', {
        title: 'Stunning Recipe',
        user: {}
    });
});

/* Profile */
router.get('/profile', function(req, res) {
    res.render('profile', {
        title: 'Stunning Recipe',
        user: {}
    });
});

/* Your own Information */
router.get('/yourInfo', function(req, res) {
    res.render('yourInfo', {
        title: 'Stunning Recipe',
        user: {}
    });
});

/* Edit Your own Information */
router.get('/editInfo', function(req, res) {
    res.render('editInfo', {
        title: 'Stunning Recipe',
        user: {}
    });
});

/* Change Password */
router.get('/changePwd', function(req, res) {
    res.render('changePwd', {
        title: 'Stunning Recipe',
        user: {}
    });
});

/* Change password */
router.get('/changePwd', function(req, res) {
    res.render('changePwd', {
        title: 'Stunning Recipe',
        layout: false,
        user: {}
    });
});

router.get("/contact", ctrlMain.contact);

router.get("/about", ctrlMain.about);

router.get("/privacy", ctrlMain.privacy);

router.get("/terms", ctrlMain.terms);

router.get("/help", ctrlMain.help);

router.get("/faqs", ctrlMain.faqs);

module.exports = router;