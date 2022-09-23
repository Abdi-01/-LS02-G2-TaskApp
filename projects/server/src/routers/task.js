const express = require('express');
const route = express.Router();
const { taskController } = require('../controllers');

route.get('/usertasks/:id/:status', taskController.getData);
route.patch('/update', taskController.updateStatus);
route.delete('/delete/:id', taskController.deleteTask);

module.exports = route;