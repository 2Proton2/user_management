const express = require('express');
const Route = express.Router();
const { userController } = require('../controllers/user.controller');
const { loginValidationRules, loginValidate } = require('../validators/login.validator');
/**
 * user login
 */
Route.post('/login', loginValidationRules(), loginValidate, userController.log_user);

module.exports = Route;