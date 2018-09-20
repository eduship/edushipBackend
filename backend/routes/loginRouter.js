var express = require('express');
var router = express.Router();

var login_controller = require('./../controllers/loginController');

router.get('/', login_controller.login);

module.exports = router;