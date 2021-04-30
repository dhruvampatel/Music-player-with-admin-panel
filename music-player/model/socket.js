const mongoose = require('mongoose');

const socketSchema = new mongoose.Schema({
    socket: {
        type: String
    },
    type: {
        type: String
    },
    eventTime: {
        type: Date
    }
});

module.exports = mongoose.model('Socket', socketSchema, 'socket');