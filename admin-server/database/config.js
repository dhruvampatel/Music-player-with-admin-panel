const mongoose = require('mongoose');

const CONNECTION = 'mongodb://127.0.0.1:27017/local';

module.exports.connect = () => {
    mongoose.connect(CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(error => {
        console.error('Mongoose connection: ', error);
    });

    return mongoose;
}