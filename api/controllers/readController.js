var Event = require('../../shared/models/event');
var Organisation = require('../../shared/models/organisation');

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
    var query = Organisation.find();
    query.select("-hash");
    query.exec(function(err, organisations){
        if(err) return next(err); 
        res.json(organisations);
    });
};

//Find Organisation by ID
exports.find_organisation_by_id = function(req, res, next) {
    var query = Organisation.findById(req.params.id);
    query.select('-hash');
    query.exec(function(err, organisation){
        if(err) return next(err);
        res.json(organisation);
    })
};