const db = require('../db');
const shortid = require('shortid');


module.exports.create = function(req, res) {
	res.render('transfer/create');
}

module.exports.createPOST = function(req, res) {
	var data = {
		id: shortid.generate(),
		account: req.body.account,
		amount: parseInt(req.body.amount),
		userID: req.signedCookies.userID
	}

	if(!data.amount) {
		res.render('transfer/create', {
			errors: [
				'Amount is required'
			],
			values: data
		});
		return;
	}

	if(!data.account) {
		res.render('transfer/create', {
			errors: [
				'Account is required'
			],
			values: data
		});
		return;
	}


	db.get('transfers').push(data).write();
	res.redirect('/transfer');
}