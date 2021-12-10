const db = require('../db');
const md5 = require('md5');


function isObject(obj) {
  return obj && obj.constructor && obj.constructor === Object;
}

function merge(target, source) {
  console.log(source); // prints { __proto__: { admin: 1 } }
  for(var attr in source) {
    // if property exists and is an object on both the target and the source
    if(isObject(target[attr]) && isObject(source[attr])) {
        merge(target[attr], source[attr]);
    }else {
        target[attr] = source[attr];
    }
  }
  return target
}

function clone(x) {
  return merge({}, x);
}


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


	res.cookie('cookieID', user.id, {
		signed: true   // Signed cookies reside in a different object to show developer intent;
	});

  res.cookie('userSigned', clone(JSON.parse(JSON.stringify(req.body))), {
    signed: true
  });

	res.redirect('/users');
};