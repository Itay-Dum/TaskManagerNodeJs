const express = require('express')
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs')
const { User } = require("../db/models");
const register = express.Router()


register.use(bodyParser.json());

register.post("/register", (req, res) => {
    // Register a new user and save it to the database. If the username already exists, send 409 HTTP code.

    let newUser = new User({
        username: req.body.username, 
        password:  req.body.password,
    })

    newUser.save().then((user) => {
        res.send(user);
    }).catch((err) => {
        if (err.name === 'MongoError' && err.code === 11000) {
            res.sendStatus(409)
        }    
    });
})


module.exports = register;

