const jwt = require('jsonwebtoken');

module.exports.checkUser = (req, res) => {
    jwt.verify(req.body.token, process.env.USER, (err, decoded) => {
        if(err) return res.status(401).json({auth: false});

        res.status(200).json({auth: true});
    })
}