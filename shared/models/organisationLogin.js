var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrganisationSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    hash: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 50},
    events: [Schema.Types.ObjectId]
  }, {
  toObject: {
  virtuals: true
  },
  toJSON: {
  virtuals: true
  }
});

module.exports = mongoose.model('OrganisationLogin', OrganisationSchema);