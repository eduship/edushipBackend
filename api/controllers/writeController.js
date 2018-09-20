var Event = require('../../shared/models/event');
var User = require('../../shared/models/user');
var Organisation = require('../../shared/models/organisation');


//Create Event
exports.create_event = function(req, res, next) {
    Event.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
};

//Update Event
exports.update_event = function(req, res, next) {
    console.log(req.body);
    Event.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
};

//Delete Event
exports.delete_event = function(req, res, next) {
    Event.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
};


//Create Organisation
exports.create_organisation = function(req, res, next) {
  Event.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
};

//Delete Organisation
exports.delete_organisation = function(req, res, next) {
  Event.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
};