const admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res) => {
    admin.findOne({
        username: req.body.username,
        password: req.body.password
    }, (error, data) => {
        if(error) throw error;

        if(data){
            //Generating token
            const token = jwt.sign({ id: data._id }, req.body.password, { expiresIn: '24h' });
            //Storing password to environment variable to verify token for other routes
            process.env.USER = req.body.password;
            console.log('Login: successfull');
            res.status(200).json({status: true, token});
        } else {
            console.log('Login: unsuccessfull');
            res.status(401).json({status: false});
        }   
    });
}