var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrganisationSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100}
  }, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true
  }
});

module.exports = mongoose.model('Organisation', OrganisationSchema);