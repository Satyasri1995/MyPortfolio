const express = require("express");
const router = express.Router();
const editController = require('../controllers/editController');

router.use("/updateProfile",editController.editPage);

module.exports = router;
