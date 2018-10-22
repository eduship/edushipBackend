var express = require('express');
var router = express.Router();

var read_controller = require('../controllers/readController');
var write_controller = require('../controllers/writeController');

/*Event Routes*/

//GET List of all events
router.get('/event/all', read_controller.get_event_list);

//GET Find event by Id
router.get('/event/:id', read_controller.get_event_by_id);

/*Organisation Routes*/

//GET List of all organisations
router.get('/organisation/all', read_controller.get_organisation_list);

//GET Find event by Id
router.get('/organisation/:id', read_controller.get_organisation_by_id);

//GET Find Events by organisation
router.get('/organisation/:id/events', read_controller.get_organisation_events);

//POST create Organisation
router.post('/organisation/create', write_controller.post_create_organisation);

//UPDATE Organisation
router.put('/organisation/update', write_controller.update_organisation);

/*confirmOrganisation Routes*/

//GET List of all organisationConfirms
router.get('/organisationConfirm/all', read_controller.get_confirmOrganisation_list);

//GET Find organisationConfirm by Id
router.get('/organisationConfirm/:id', read_controller.get_confirmOrganisation_by_id);

module.exports = router;