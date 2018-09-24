var express = require('express');
var router = express.Router();

var read_controller = require('../controllers/readController');

/*Event Routes*/

//GET List of all events
router.get('/event/all', read_controller.list_event);

//GET Find event by Id
router.get('/event/:id', read_controller.find_event_by_id);

/*Organisation Routes*/

//GET List of all organisations
router.get('/organisation/all', read_controller.list_organisation);

//GET Find event by Id
router.get('/organisation/:id', read_controller.find_organisation_by_id);