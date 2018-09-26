var express = require('express');
var router = express.Router();
var auth = require('../auth/user_auth');

var user_controller = require('../controllers/userController');
var organisation_controller = require('../controllers/organisationController');

//GET organisation home
router.get('/', organisation_controller.get_home);

//GET register Organisation Page
router.get('/register', organisation_controller.get_register_organisation);

//POST register Organisation with organisationConfirm Database entry
router.post('/register', organisation_controller.post_register_organisation);

//GET Login Form
router.get('/login', user_controller.get_login);

//GET Logout Page
router.get('/logout', organisation_controller.get_logout);

router.get('/create', organisation_controller.get_create_event);

router.post('/create', organisation_controller.post_create_event);

module.exports = router;