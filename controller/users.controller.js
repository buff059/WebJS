//--------------------------------------
// Xu ly request va response here
// Controller from MVC
//--------------------------------------
const md5 = require('md5');

const db = require('../db');

const shortid = require('shortid');

module.exports.index = function(req, res) {
	res.render('users/index', 
	{
		users: db.get('users').value()
	});			
}

module.exports.search = function(req, res) {
	var query = req.query.q;
	console.log(req.query);
	var matched = db.get('users').value().filter(function(user) {
		return user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
	});


	res.render('users/index', {
		users: matched
	});
}

module.exports.createGET = function(req, res) {
	res.render('users/create');
}


module.exports.viewByID = function(req, res) {
	var id = req.params.id;
	//console.log(req.params);
	var user = db.get('users').find({id: id}).value(); // find all keys has value id with id value received from params
	//console.log(user);
	if(user) { 
		res.render('users/view', {
			users: user
		});
	}else {
		res.send('Error');
	}
} 

module.exports.createPOST = function(req, res) {
	// Save infomation from user's request
	req.body.id = shortid.generate();
	req.body.password = md5(req.body.password);
	db.get('users').push(req.body).write();
	// return information for user
	res.redirect('/users');
}