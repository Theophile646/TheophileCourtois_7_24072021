const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
//const passwordCheck = require('../middleware/password-validator'); // middleware that verify if the password in creation meets the requirements of the password schema
//const limiter = require('../middleware/limiter'); // Middleware to check and block the login attemps to 6 within 15 mins


// Create a new User with signup
router.post("/signup", userCtrl.signUp);

// Login
router.post('/login', userCtrl.login);

// Retrieve all Users
//router.get("/users", userCtrl.findAll);

// Retrieve a single User with userId
router.get("/:userId", userCtrl.findOne);

// Update a User with userId
//router.put("/:userId", userCtrl.update);

// Delete a User with userId
router.delete("/users/:userId", userCtrl.delete);



module.exports = router;
