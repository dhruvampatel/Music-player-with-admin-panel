const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
    socket: {
        type: String
    },
    songId: {
        type: String
    },
    downloadTime: {
        type: Date
    }
});

module.exports = mongoose.model('Download', downloadSchema, 'download');