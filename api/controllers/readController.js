var Event = require('../../shared/models/event');
var Organisation = require('../../shared/models/organisation');
var User = require('../../shared/models/user');

//List of all events
exports.list_event = function(req, res, next){
    Event.find(function (err, events) {
        if (err) return next(err);
        res.json(events);
    });
};

//Find Event by ID
exports.find_event_by_id = function(req, res, next) {
    Event.findById(req.params.id, function (err, event) {
      if (err) return next(err);
      res.json(event);
    });
};

//List of all Organisations
exports.list_organisation = function(req, res, next){
    Organisation.find(function (req, organisations){
        if (err) return next(err);
        res.json(organisations);
    });
};

//Find Organisation by ID
exports.find_organisation_by_id = function(req, res, next) {
    Organisation.findById(req.params.id, function (err, organisation) {
      if (err) return next(err);
      res.json(organisation);
    });
};

//List of all Users
exports.list_user = function(req, res, next){
    User.find(function (req, users){
        if (err) return next(err);
        res.json(users);
    });
};

//find User by ID
exports.find_user_by_id = function(req, res, next){
    User.find(function (req, users){
        if (err) return next(err);
        res.json(users);
    });
};