const express = require('express');
const router = express.Router();
const userCtrl = require("../controllers/user.controller");
const passwordCheck = require('../middleware/password-validator'); // middleware that verify if the password in creation meets the requirements of the password schema
const limiter = require('../middleware/limiter'); // Middleware to check and block the login attemps to 6 within 15 mins
const auth = require('../middleware/auth'); // check if user has the token before performing request



// Create a new User with signup
router.post("/signup", passwordCheck, userCtrl.signUp);

// Login
router.post('/login', limiter, userCtrl.login);

// Retrieve all Users
router.get("/users", auth, userCtrl.findAllUsers);

// Retrieve a single User with userId
router.get("/:userId", auth, userCtrl.findOne);

// Delete a User with userId
router.delete("/users/:userId", auth, userCtrl.delete);



module.exports = router;
