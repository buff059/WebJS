const express = require('express');
const router = express.Router();

const controller = require('../controller/api.users.controller');

router.get('/users', controller.index);

module.exports = router;
