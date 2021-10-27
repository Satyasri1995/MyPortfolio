const express = require("express");
const router = express.Router();
const deleteController = require("../controllers/deleteController");
const authGuard = require("./../utils/auth/authGuard");

router.post("/service", authGuard, deleteController.deleteService);

module.exports = router;
