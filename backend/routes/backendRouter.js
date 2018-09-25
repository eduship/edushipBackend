var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

router.get('/login', user_controller.get_login);

module.exports = router;