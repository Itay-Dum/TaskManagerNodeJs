const express = require('express')
const bodyParser = require("body-parser");
const { Task } = require("../db/models");
const { verifyToken } = require("../authServer/jwt.functions")
const { StatusCodes } = require('http-status-codes')


const tasks = express.Router()
tasks.use(bodyParser.json());


tasks.get('/lists/:listsId/tasks', verifyToken, (req, res) => {
    // Serach a Task by id, than send it.
    Task.find({
        _listId: req.params.listsId,
        _ownerUserId: req.userId
    }).then((tasks) => {
        res.send(tasks)
    })
});

     
tasks.post('/lists/:listsId/tasks', verifyToken, (req, res) => {
    // Create and save a new task in a specific list by reciving a list id and a task title. 

    let newTask = new Task({
        _ownerUserId: req.userId,
        title: req.body.title,
        _listId: req.params.listsId,
    });

    newTask.save().then((newTask) => {
        res.send(newTask);
    });
});

tasks.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    // Update an existing task propeties, and save it.

    Task.findOneAndUpdate (
    { 
        _id: req.params.taskId,
        _listId: req.params.listId,
        _ownerUserId: req.userId
    }, {
        title: req.body.title,
        completed: req.body.completed
       }
    ).then(() => {
        res.sendDStatus(StatusCodes.OK);
    }).catch((err => {
        res.sendStatus(StatusCodes.NOT_FOUND)
    }))
});

tasks.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    // Delete an existing task from the database.

    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId,
        _ownerUserId: req.userId
    }).then((removedTask) => {
        res.send(removedTask);
    }).catch((err => {
        res.sendStatus(StatusCodes.NOT_FOUND)
    }))
});

module.exports = tasks;