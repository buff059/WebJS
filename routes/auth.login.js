const express = require('express');
const router = express.Router(); //return Router object

const controller = require('../controller/login.controller');

router.get('/login', controller.authLogin);

router.post('/login', controller.authLoginPOST);

module.exports = router;