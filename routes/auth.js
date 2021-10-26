

const authController = require('./../controllers/authController');
const express = require("express");
const router = express.Router();


router.use('/signin',authController.loginPage);
router.use('/createAccount',authController.registerPage);
router.post("/login",authController.login);
router.post("/register",authController.register);

module.exports = router;
