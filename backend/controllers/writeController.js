var Event = require('../models/event');

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