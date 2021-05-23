const express = require('express');
const router = express.Router();

const controller = require('../controller/products.controller');
const auth = require('../validate/users.login.cookie');

router.get('/', auth.authLoginPOST, controller.index);

module.exports = router;