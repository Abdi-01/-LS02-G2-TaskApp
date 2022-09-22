const express = require('express');
const { authController } = require('../controllers')
const route = express.Router();

route.get('/', authController.getData);
route.post('/register', authController.register);

module.exports = route;