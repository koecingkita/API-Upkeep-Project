const express = require("express");
const router = express.Router();

const userController = require('../controller/user')
const authenticate = require("../middleware/authenticate.js");

//Login and Register
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)

//Verified
router.get('/verified', userController.verifiedUser)
router.get('/verify/:userId/:uniqueString', userController.verifiedEmail)


module.exports = router;