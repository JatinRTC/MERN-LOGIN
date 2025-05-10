const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    amount: {
        type: Number,
    },
    date: {
        type: Date,
    },
    method: {
        type: String,
    },
    status: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
});

const Balance = mongoose.model('Balance', withdrawalSchema);
module.exports = Balance;
