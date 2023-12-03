const express = require('express');
const Route = express.Router();
const { userController } = require('../controllers/user.controller');
const { loginValidationRules, loginValidate } = require('../validators/login.validator');
const { auth_middleware } = require('../middlewares/auth.middleware');
/**
 * user login
 */
Route.post('/login', loginValidationRules(), loginValidate, auth_middleware, userController.log_user);

module.exports = Route;