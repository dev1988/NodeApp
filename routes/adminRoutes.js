const express = require('express');
const route = express.Router();
const adminController = require('../controller/adminController');

route.get('/dashboard',adminController.index);
route.get('/profile',adminController.profile);
route.post('/update',adminController.updatePofofile);

module.exports = route;