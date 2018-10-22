var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrganisationSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    hash: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 50},
    isAdmin: {type: Boolean, required: true, default: false},
    events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
  }, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true
  }
});

module.exports = mongoose.model('Organisation', OrganisationSchema);