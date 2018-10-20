var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrganisationSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 50},
    password: {type: String, required: true, max: 300},
    link: {type: String, required: false, max: 200},
    description: {type: String, required: true, max: 10000}
  }, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true
  }
});

module.exports = mongoose.model('OrganisationConfirm', OrganisationSchema);