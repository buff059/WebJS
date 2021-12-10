const db = require('../../db');

module.exports.index = function(req, res) {		
	var products = db.get('products').value().map(function(item){
    return item.name;
  });
	res.json(products);
}