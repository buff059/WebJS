const express = require('express');
const router = express.Router();

const controller = require('../controller/transfer.controller');
const auth = require('../validate/users.login.cookie');

router.get('/', auth.authLoginPOST, controller.create);
router.post('/', controller.createPOST);

module.exports = router;
