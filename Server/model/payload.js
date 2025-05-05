const mongoose = require('mongoose');

const PayloadSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    },
  isEnabled: {
    type: Boolean,
    default: false
 },
});

const Payload = mongoose.model('Payload', PayloadSchema);
module.exports = Payload;
