const express = require("express");
const router = express.Router();
const editController = require("../controllers/editController");
const authGuard = require("./../utils/auth/authGuard");

router.use("/updateProfile", authGuard, editController.editPage);

router.post("/basicDetails", authGuard, editController.editBasicDetails);
router.post("/about", authGuard, editController.editAbout);
router.post("/education", authGuard, editController.editEducation);

module.exports = router;
