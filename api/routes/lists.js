const express = require('express')
const bodyParser = require("body-parser");
const { List } = require("../db/models");
const { verifyToken } = require("../authServer/jwt.functions")
const { StatusCodes } = require('http-status-codes')

const lists = express.Router()
lists.use(bodyParser.json());

lists.get("/lists", verifyToken, (req, res) => {
    // Find all list objects and send them to the client
    List.find({_ownerUserId: req.userId}).then((lists) => {
        res.send(lists);
    })

});

lists.post("/lists", verifyToken, (req, res) => {
    // Create a new list and save it to the database.

    let title = req.body.title;

    let newList = new List({
        title: title,
        _ownerUserId: req.userId,
    })
    newList.save().then((listDoc) => {
        res.send(listDoc)
    })
})


lists.patch("/lists/:id", verifyToken, (req, res) => {
    // find the list requested by the id, and update the list object to another list object.

    List.findOneAndUpdate(
    {
        _id: req.params.id,
        _ownerUserId: req.userId

    }, {
        _id: req.params.id,
        titie: req.body.titie
    }).then(() => { //After updating the list, send 200 http code.
        res.sendStatus(StatusCodes.OK)
    })
})


lists.delete("/lists/:id", verifyToken, (req, res) => {
    // Delete a list from the database, if it dosen't exist, send 404 HTTP code.

    List.findOneAndRemove({
        _id: req.params.id,
        _ownerUserId: req.userId
    }).then((r) => {
        res.send(r);
    }).catch((err => {
        res.sendStatus(StatusCodes.NOT_FOUND)
    }))
});

module.exports = lists;