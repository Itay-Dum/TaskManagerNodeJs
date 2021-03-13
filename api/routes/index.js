const express = require('express');

const lists = require('./lists');
const tasks = require('./tasks');
const login = require('./login');
const register = require('./register');

const index = express.Router();

index.use(lists);
index.use(tasks);
index.use(login);
index.use(register);

module.exports = index;