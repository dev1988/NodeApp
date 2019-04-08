const express = require('express');
const route = express.Router();
const userController = require('../controller/userController');
const {isLogin} = require('../middleware/authentication');

route.get(['/','/login'], isLogin, userController.index);
route.get('/registration',isLogin, userController.signUpform);
route.post('/signUp',isLogin, userController.signUp);
route.post('/login',isLogin, userController.login);
route.get('/logout',userController.logOut);
route.get('/reset', isLogin, userController.reset);


module.exports = route; 