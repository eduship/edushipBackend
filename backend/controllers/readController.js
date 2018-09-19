var Event = require('../models/event');

//List of all events
exports.list_event = function(req, res, next){
    Event.find(function (err, products) {
        if (err) return next(err);
        res.json(products);
    });
};

//Find Event by ID
exports.find_event_by_id = function(req, res, next) {
    Event.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
};

