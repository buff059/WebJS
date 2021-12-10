const db = require('../../db');
const fs = require('fs');

module.exports.index = function(req, res) {   
  var users = db.get('users').value();
  res.json(users);
}