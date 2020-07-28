const express = require("express");
const router = express.Router();
const mainController = require('../controllers/main');
const dishController = require('../controllers/dish');
const userController = require('../controllers/user');
const autocompleteController = require('../controllers/autocomplete');
const requireLogin = require("./../middlewares/auth.mdw");

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
router.get('/dishes', dishController.dishes);

/* Dish detail */
router.get('/dish/:dishID', dishController.dishDetail);

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
router.get('/post_recipe', dishController.postDish);

/* Profile */
router.get("/profile", requireLogin, async(req, res) => {
    return res.redirect(`/profile/${req.user.userID}`);
});
router.get('/profile/:id', userController.profile);

/* Your own Information */
router.get('/yourInfo', userController.yourInfo);

/* Edit Your own Information */
router.get('/editInfo', userController.editInfoView);
router.post('/editInfo', userController.editInfo);

/* Change password */
router.get('/changePwd', userController.changePwdView);
router.post('/changePwd', userController.changePwd);

router.get("/contact", mainController.contact);

router.get("/about", mainController.about);

router.get("/privacy", mainController.privacy);

router.get("/terms", mainController.terms);

router.get("/help", mainController.help);

router.get("/faqs", mainController.faqs);

router.get("/error", (req, res) => {
    res.render('error', {
        title: 'Lỗi'
    });
});

// Autocomplete API
router.get("/autocompleteNutritions", autocompleteController.autocompleteNutritions);
router.get("/autocompleteIngredients", autocompleteController.autocompleteIngredients);

module.exports = router;