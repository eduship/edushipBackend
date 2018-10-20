var express = require('express');
var router = express.Router();
var auth = require('./../auth/admin_auth');

var template_controller = require('../controllers/serveTemplateController');
var organisation_controller = require('../controllers/confirmOrganisationController');

router.get('/', template_controller.get_dashboard);

router.get('/login', template_controller.get_login);

router.get('/list', organisation_controller.get_organisation_list);

router.get('/detail/:id', organisation_controller.get_organisation_detail);

router.post('/confirm/:id', organisation_controller.post_confirm_organisation);

module.exports = router;