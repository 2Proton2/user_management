const express = require('express');
const Route = express.Router();
const {adminController} = require('../controllers/admin.controller');
const { loginValidationRules, loginValidate } = require('../validators/login.validator');
const { createUserValidationRules, createUservalidate } = require('../validators/user_creation.validator');
const { auth_middleware, session_middleware } = require('../middlewares/auth.middleware');

/**
 * admin login
 */
Route.post('/login', loginValidationRules(), loginValidate, auth_middleware, adminController.log_user);

/**
 * creating a new user
 */
Route.post('/add-user', createUserValidationRules(), createUservalidate, session_middleware, adminController.add_user);

/**
 * deleting a user
 */
Route.delete('/delete-user/:id', session_middleware, adminController.del_user);

/**
 * retreiving all the users
 */
Route.get('/get-all-users', session_middleware, adminController.get_all_user);

/**
 * updating a user details
 */
Route.put('/update-user/:id', session_middleware, adminController.update_user);

/**
 * logout
 */
Route.post('/logout', session_middleware, adminController.logout_user);

module.exports = Route;