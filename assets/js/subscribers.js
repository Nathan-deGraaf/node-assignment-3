const mongoose = require('mongoose');

// setting the parameters of our subscribers. our subscribers will need too follow this schema
const subscribersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    adult: {
      type: Boolean,
      default: false
    }
  }
);

//important that we only export the model. creates the empty clone to fill.
const Subscribers = mongoose.model('Subscribers', subscribersSchema);

module.exports = Subscribers;