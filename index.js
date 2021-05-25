require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3333;


const usersRouter = require('./routes/users.route');
const authLogin = require('./routes/auth.login')
const auth = require('./validate/users.login.cookie');
const transferRouter = require('./routes/transfer.route');
const productsRouter = require('./routes/products.route');
const sessionMiddleware = require('./validate/session');

const apiProductsRouter = require('./api/routes/api.products.route');

app.set('view engine', 'pug');
app.set('views', './src/views');

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('process.env.SESSION_SEC'));
app.use(sessionMiddleware);
// app.use(express.static('public'));



app.get('/', function(req, res) {
	res.render('index');
});

app.use('/users', usersRouter);
app.use('/auth', authLogin);
app.use('/transfer', transferRouter);
app.use('/products', productsRouter);

app.use('/api/products', apiProductsRouter);

app.listen(port, function() {
	console.log('Server running on port ' + port);
});