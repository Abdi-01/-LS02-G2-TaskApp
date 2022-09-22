const express = require('express');
const route = express.Router();
const { taskController } = require('../controllers');

route.get('/all',taskController.getTask);
route.post('/addtask', taskController.addTask);

module.exports=route;