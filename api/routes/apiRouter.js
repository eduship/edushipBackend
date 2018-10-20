var express = require('express');
var router = express.Router();

var read_controller = require('../controllers/readController');

/*Event Routes*/

//GET List of all events
router.get('/event/all', read_controller.get_event_list);

//GET Find event by Id
router.get('/event/:id', read_controller.get_find_event_by_id);

/*Organisation Routes*/

//GET List of all organisations
router.get('/organisation/all', read_controller.get_organisation_list);

//GET Find event by Id
router.get('/organisation/:id', read_controller.get_find_organisation_by_id);

module.exports = router;