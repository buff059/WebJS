const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if JSON file is empty)
db.defaults({ 
	users: [],
	transfers: [],
	products: []
}).write();

module.exports = db;