const download = require('../models/Download');

module.exports.downloadEvent = (req, res) => {
    download.find({}, (error, data) => {
        if(error) throw error;

        res.status(200).json(data);
    });
}