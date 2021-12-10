//--------------------------------------
// Xu ly request va response here
// Controller from MVC
//--------------------------------------
const md5 = require('md5');

const db = require('../db');

const shortid = require('shortid');

const fileUpload = require('express-fileupload')

const util = require('util');

const path = require('path');

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
		return user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1; // q not in users to return -1
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

module.exports.createPOST = async function(req, res) {
	// Save infomation from user's request
	req.body.id = shortid.generate();
	req.body.password = md5(req.body.password);
  
  db.get('users').push(req.body).write();

	// return information for user
  res.redirect('/users');
}


module.exports.getMessage = function(req, res) {
  var user = JSON.parse(JSON.stringify(req.signedCookies));
  var userSigned = db.get('users').find({ id: user.id }).value();
  if(userSigned) { 
    res.send(userSigned.message);
  }else {
    res.send('Error');
  }
}