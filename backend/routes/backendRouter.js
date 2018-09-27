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

//GEt event create page
router.get('/create', organisation_controller.get_create_event);

//POST create Event
router.post('/create', organisation_controller.post_create_event);

//GET update form
router.get('/update/:id', organisation_controller.get_update_event);

//POST update event form
router.post('/update/:id', organisation_controller.post_update_event);

//GET delete element
router.get('/delete/:id', organisation_controller.get_delete_event);

//GET Logout Page
router.get('/logout', organisation_controller.get_logout);

module.exports = router;