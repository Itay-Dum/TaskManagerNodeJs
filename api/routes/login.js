const express = require('express')
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs')
const { User } = require("../db/models");
const { signInUser } = require('../authServer/jwt.functions')
const login = express.Router()

login.use(bodyParser.json());

login.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username }).then(user => {
        if (!user) {
            res.sendStatus(403);  
        }
        else {
            bcrypt.compare(password, user.password, (err, data) => {
                if (err || !data) {
                    res.sendStatus(403);  
                }
                if (data) {
                    signInUser(req, res, user)
                }
            })
        }
    })
});


module.exports = login;