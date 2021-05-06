const express = require('express');
const router = express.Router(); //return Router object

const controller = require('../controller/users.controller');
const validate = require('../validate/users.create.validate');
const auth = require('../validate/users.login.cookie');


router.get('/', auth.authLoginPOST, controller.index);

router.get('/search', auth.authLoginPOST, controller.search)

router.get('/create', controller.createGET);

router.get('/view/:id', auth.authLoginPOST, controller.viewByID);

router.post('/create', validate.createPOST, controller.createPOST);

module.exports = router;