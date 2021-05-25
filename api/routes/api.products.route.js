const express = require('express');
const router = express.Router();

const controller = require('../controller/api.products.controller');

router.get('/', controller.index);

module.exports = router;