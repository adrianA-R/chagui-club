const express = require('express');
//const validator = require('express-validator');
const passport = require('passport');
const { isLoggedIn} = require('../lib/access') //--->> valida si estan loggeados
const validatorHandler = require('../middlewares/validator.handler');
const { newUserSchema, loginSchema }  = require('../schemas/access.schema')


const router = express.Router();


router.get('/',
	async (req, res) => {
	res.render('index');
});

router.get("profile", isLoggedIn, (req, res) => {
	res.render("profile");
});

router.get('/signin',
    (req, res) => {
    res.render('signin');
});

router.get('/signup',
    (req, res) => {
	res.render('signup');
});

router.post('/signup', 
	validatorHandler(newUserSchema, 'body'),
	passport.authenticate("local.signup", {
    successRedirect: "/signin",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.post(
	"/signin", 
	validatorHandler(loginSchema, 'body'),
	(req, res, next) => {
	passport.authenticate("local.signin", {
	successRedirect: "/games",
	failureRedirect: "/signin",
	failureFlash: true,
	})(req, res, next);
  }
);

router.get("/logout", isLoggedIn, (req, res, next) => {
	req.logout(function(err){
		if (err){
			return(next(err));
		}
	});
	res.redirect("/");
});

module.exports = router;