require('dotenv').config();
const express = require('express');
const app = express();
const port = 3333;
const cookieParser = require('cookie-parser');
const usersRouter = require('./routes/users.route');
const authLogin = require('./routes/auth.login')
const auth = require('./validate/users.login.cookie');

app.set('view engine', 'pug');
app.set('views', './src/views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('process.env.SESSION_SEC'));
// app.use(express.static('public'));

app.get('/', auth.authLoginPOST, function(req, res) {
	res.render('index');
});

app.use('/users', usersRouter); // very important !!!!
app.use('/auth', authLogin)

app.listen(port, function() {
	console.log('Server running on port ' + port);
});