var express = require("express");
var ctrlMain = require("../controllers/main.js");

var router = express.Router();

/* GET Home page. */
router.get("/", function (req, res) {
  //   res.render('yourProfile', {
  // 		title: 'Stunning Recipe',
  // 		user: {}
  // 		//layout: false
  // 	});
  res.render("profile", {
    title: "Stunning Recipe",
    user: {},
    //layout: false
  });
});

router.get("/contact", ctrlMain.contact);

router.get("/about", ctrlMain.about);

router.get("/privacy", ctrlMain.privacy);

router.get("/terms", ctrlMain.terms);

router.get("/help", ctrlMain.help);

router.get("/faqs", ctrlMain.faqs);

module.exports = router;
