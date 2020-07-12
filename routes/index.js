var express = require("express");
var ctrlMain = require("../controllers/main.js");

var router = express.Router();

/* GET Home page. */
router.get('/', function(req, res) {
    res.render('index', {
        title: 'Stunning Recipe',
        user: {}
    });
});

/* Login */
router.get('/login', function(req, res) {
    res.render('login', {
        title: 'Stunning Recipe',
        layout: false
    });
});

/* Sign up */
router.get('/signup', function(req, res) {
    res.render('login', {
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

/* Your own Profile */
router.get('/yourProfile', function(req, res) {
    res.render('yourProfile', {
        title: 'Stunning Recipe',
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