const db = require('../db');
const md5 = require('md5');

module.exports.authLogin = function(req, res) {
	res.render('auth/login');
};


module.exports.authLoginPOST = function(req, res) {
	var email = req.body.email;
	var password = req.body.password;

	var user = db.get('users').find({ email: email }).value();

	if(!user) {
		res.render('auth/login', {
			errors: [
				'User does not exist'
			],
			values: req.body
		});
		return;
	}


	var hashedPass = md5(password);
	if(user.password !== hashedPass) {
		res.render('auth/login', {
			errors: [
				'Wrong password'
			],
			values: req.body
		})
		return;
	}


	res.cookie('userName', user.name, {
		signed: true   // Signed cookies reside in a different object to show developer intent;
	});
	res.redirect('/users');
};