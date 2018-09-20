var express = require('express');
var router = express.Router();

var auth = require('../auth/api_auth');

var read_controller = require('../controllers/readController');
var write_controller = require('../controllers/writeController');

/*Event Routes*/

//GET List of all events
router.get('/event/all', read_controller.list_event);

//GET Find event by Id
router.get('/event/:id', read_controller.find_event_by_id);

//POST create Event
router.post('/event/create', auth.authenticate('basic', { session: false}), write_controller.create_event);

//POST Update Event
router.post('/event/update/:id', auth.authenticate('basic', { session: false}), write_controller.update_event);

//POST Delete Event
router.post('/event/delete/:id', auth.authenticate('basic', { session: false}), write_controller.delete_event); 

/*Organisation Routes*/

//GET List of all organisations
router.get('/organisation/all', auth.authenticate('basic', { session: false}), read_controller.list_organisation);

//GET Find event by Id
router.get('/organisation/:id', auth.authenticate('basic', { session: false}), read_controller.find_organisation_by_id);

//POST Create organisation
router.post('/organisation/create', auth.authenticate('basic', { session: false}), write_controller.create_organisation);

//POST Delete Organisation
router.post('/organistaion/cdelete/:id', auth.authenticate('basic', { session: false}), write_controller.delete_organisation);


module.exports = router;