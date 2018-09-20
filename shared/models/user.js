var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    organisation: {type: Schema.ObjectId, ref:'Organisation', required: true},
    password: {type: String, required: true, max: 100}
  }, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true
  }
});

module.exports = mongoose.model('User', UserSchema);



/*
// Virtual for event's URL
EventSchema
.virtual('url')
.get(function () {
  return '/catalog/event/' + this._id;
});
*/
