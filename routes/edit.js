const express = require("express");
const router = express.Router();
const editController = require("../controllers/editController");
const authGuard = require("./../utils/auth/authGuard");

router.use("/updateProfile", authGuard, editController.editPage);

router.post("/basicDetails", authGuard, editController.editBasicDetails);
router.post("/about", authGuard, editController.editAbout);
router.post("/service", authGuard, editController.editService);
router.post("/funfact",editController.editFunFact);
router.post("/education", authGuard, editController.editEducation);
router.post("/experience", authGuard, editController.editExperience);
router.post("/language", authGuard, editController.editLanguage);
router.post("/code", authGuard, editController.editCode);
router.post("/quote", authGuard, editController.editQuote);

module.exports = router;
