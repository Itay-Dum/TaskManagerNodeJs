const jwt = require('jsonwebtoken')
const { getJWTSecretKey } = require('../config')
const { User } = require("../db/models/index")

module.exports = {
    
    verifyToken: (req, res, next) => {
        const bearer = req.headers['x-access-token'];
        const token = bearer.split(" ")[1]
        jwt.verify(token, getJWTSecretKey(), (err, userObj) => {
            if (err) {
                return res.status(401).send(err);
            }
            else {
                req.userId = userObj.userObj._id;
                next();
            }
        })
    },

    signInUser: (req, res, userObj) => {
        jwt.sign({userObj}, getJWTSecretKey(), {expiresIn: "1d"}, (err, token) => {
            res.json(token);
        });
    },

};