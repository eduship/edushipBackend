var express = require('express');
var router = express.Router();
var auth = require('./../auth/admin_auth');

var admin_controller = require('./../controllers/testController');

router.get('/login', admin_controller.serve_login);

router.get('/welcome', admin_controller.serve_welcome);

router.get('/test', admin_controller.serve_test2);

module.exports = router;