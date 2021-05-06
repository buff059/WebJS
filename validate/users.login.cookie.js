const db = require('../db');

module.exports.authLoginPOST = function(req, res, next) {
	var cookieRight = req.cookies;

	if(!cookieRight) {
		res.redirect('/auth/login');
		return;
	}

	var user = db.get('users').find({ id: cookieRight.userId }).value();

	if(!user) {
		res.redirect('/auth/login');
		return;
	}

	res.locals.user = user;

	next();
};