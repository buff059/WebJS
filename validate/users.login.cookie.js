const db = require('../db');

module.exports.authLoginPOST = function(req, res, next) {
	var cookieRight = req.signedCookies;

	if(!cookieRight) {
		res.redirect('/auth/login');
		return;
	}

	var user = db.get('users').find({ id: cookieRight.userID }).value();

	if(!user) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user;

	next();
};