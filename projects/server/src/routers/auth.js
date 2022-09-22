const express = require('express');
const route = express.Router();
const { authController } = require('../controllers');

route.get('/all',authController.getData)
route.post('/login',authController.login)
route.post('/register', authController.register);

module.exports=route;
