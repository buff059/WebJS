const express = require('express');
const multer = require('multer');
const router = express.Router(); //return Router object

const controller = require('../controller/users.controller');
const validate = require('../validate/users.create.validate');
const auth = require('../validate/users.login.cookie');


router.get('/', controller.index);

router.get('/search', auth.authLoginPOST, controller.search)

router.get('/create', controller.createGET);

router.get('/view/:id', auth.authLoginPOST, controller.viewByID);

router.get('/getMessage', controller.getMessage);

router.post('/create', validate.createPOST, controller.createPOST);

module.exports = router;