var express = require('express');
var router = express.Router();
var auth = require('../auth/user_auth');

var user_controller = require('../controllers/userController');
var organisation_controller = require('../controllers/organisationController');

router.get('/login', user_controller.get_login);

router.get('/', organisation_controller.get_home);

module.exports = router;