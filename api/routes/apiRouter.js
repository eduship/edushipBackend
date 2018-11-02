var express = require('express');
var router = express.Router();

var read_controller = require('../controllers/readController');
var write_controller = require('../controllers/writeController');

/***Event Routes***/

/*** READ ***/

//GET List of all events
router.get('/event/all', read_controller.get_event_list);

//GET Find event by Id
router.get('/event/:id', read_controller.get_event_by_id);

/*** WRITE ***/

//POST Create Event
router.post('/event/create', isLoggedIn, write_controller.post_create_event);

//PUT update event by id
router.put('/event/update/:id', isLoggedIn, write_controller.update_event_by_id);

//DELTE event by id
router.delete('/event/delete/:id', isLoggedIn, write_controller.delete_event_by_id)

/***Organisation Routes***/

/*** READ ***/

//GET List of all organisations
router.get('/organisation/all', read_controller.get_organisation_list);

//GET Find event by Id
router.get('/organisation/:id', read_controller.get_organisation_by_id);

//GET Find Events by organisation
router.get('/organisation/:id/events', read_controller.get_organisation_events);

/*** WRITE ***/

//POST create Organisation
router.post('/organisation/create/:id', isAdmin, write_controller.post_create_organisation_by_confOrg_id);

//PUT update Organisation
router.put('/organisation/update', isLoggedIn, write_controller.update_organisation);

//DELETE Organisation by Id
router.delete('/organisation/delete/:id', isAdmin, write_controller.delete_organisation_by_id);

/***confirmOrganisation Routes***/

/*** READ ***/

//GET List of all organisationConfirms
router.get('/organisationConfirm/all', isAdmin, read_controller.get_confirmOrganisation_list);

//GET Find organisationConfirm by Id
router.get('/organisationConfirm/:id', isAdmin, read_controller.get_confirmOrganisation_by_id);

/*** WRITE ***/

//POST create organisationConfirm
router.post('/organisationConfirm/create', write_controller.post_create_confirmOrganisation);

//DELETE organisationConfirm by Id
router.delete('/organisationConfirm/delete/:id', isAdmin, write_controller.delete_confirmOrganisation_by_id);

module.exports = router;

//middleware to check if user is logged in 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(400).json({
        'message': 'access denied'
    });
}

//middleware to check if user is logged in as Admin
function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin)
        return next();
    res.status(400).json({
        'message': 'access denied'
    });
}