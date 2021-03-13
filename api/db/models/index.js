// Combined all models to one file to not import each model seperetly in app.js

const { List } = require('./list.model');
const { Task } = require('./task.model')
const { User } = require('./user.model')

module.exports = {
    List,
    Task,
    User
}