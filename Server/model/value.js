const mongoose = require("mongoose");

const valueSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    balance:{
        type: Number,
        required: true,
    }
})

const Value = mongoose.model('Value', valueSchema);
module.exports = Value;
