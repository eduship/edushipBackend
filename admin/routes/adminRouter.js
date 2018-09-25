var express = require('express');
var router = express.Router();
var auth = require('./../auth/admin_auth');

var template_controller = require('../controllers/serveTemplateController');

router.get('/', template_controller.get_dashboard);

router.get('/login', template_controller.get_login);

module.exports = router;