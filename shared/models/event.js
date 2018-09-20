var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EventSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    date: {type: String, required: true, max: 20},
    organisation: {type: Schema.ObjectId, ref: 'Organisation', required: true},
    placeAdress: {type: String, required: false, max: 100},
    time: {type: String, required: false, max: 100},
    description: {type: String, required: false, max: 10000},
    link: {type: String, required: false, max: 400},
    level: {type: String, required: false, max: 20},
    costs: {type: String, required: false, max: 40},
    age: {type: String, required: false, max: 10},
    tags: {type: String, required: false, max: 100},

    updated_date: { type: Date, default: Date.now }
  }, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true
  }
});

module.exports = mongoose.model('Event', EventSchema);



/*
// Virtual for event's URL
EventSchema
.virtual('url')
.get(function () {
  return '/catalog/event/' + this._id;
});
*/
