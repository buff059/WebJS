const db = require('../db');

module.exports.index = function(req, res) {
	var page = parseInt(req.query.page) || 1;
	var numPerPage = 12;
	var begin = (page - 1) * numPerPage;
	var end = page * numPerPage;
	res.render('products/index', {
		products: db.get('products').value().slice(begin, end),
		page: page
	});			
}