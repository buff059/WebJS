const db = require('../db')

module.exports.createPOST = function(req, res, next) {
	var errors = [];

	var data = {
		name: req.body.name,
		phone: req.body.phone,
		email: req.body.email,
		password: req.body.password
	}

	if(!data.name) {
		errors.push('Name is required');
	}
	if(!data.phone) {
		errors.push('Phone is required');
	}

	if(!data.email) {
		errors.push('Email is required');
	}
	if(!data.password) {
		errors.push('Password is required');
	}

	if(errors.length) {
		res.render('users/create',{
			errors: errors,
			values: req.body
		});
		return;
	}

	next();
};