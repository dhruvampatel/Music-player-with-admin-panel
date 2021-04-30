const socket = require('../models/Connection');

module.exports.connectionEvent = (req, res) => {
    socket.find({}, (error, data) => {
        if(error) throw error;

        res.status(200).json(data);
    });
}