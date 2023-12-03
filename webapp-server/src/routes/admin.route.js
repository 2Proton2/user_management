const express = require('express');
const Route = express.Router();
const {adminController} = require('../controllers/admin.controller');
const { loginValidationRules, loginValidate } = require('../validators/login.validator');
const { createUserValidationRules, createUservalidate } = require('../validators/user_creation.validator');

/**
 * admin login
 */
Route.post('/login', loginValidationRules(), loginValidate, adminController.log_user);

/**
 * creating a new user
 */
Route.post('/add-user', createUserValidationRules(), createUservalidate, adminController.add_user);

/**
 * deleting a user
 */
Route.delete('/delete-user/:id', adminController.del_user);

/**
 * retreiving all the users
 */
Route.get('/get-all-users', adminController.get_all_user);

/**
 * updating a user details
 */
Route.put('/update-user/:id', adminController.update_user);

module.exports = Route;