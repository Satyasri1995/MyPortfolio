const express = require("express");
const router = express.Router();
const deleteController = require("../controllers/deleteController");
const authGuard = require("./../utils/auth/authGuard");

router.post("/service", authGuard, deleteController.deleteService);
router.post("/funfact", authGuard, deleteController.deleteFunFact);
router.post("/education", authGuard, deleteController.deleteEducation);
router.post("/experience", authGuard, deleteController.deleteExperience);
router.post("/language", authGuard, deleteController.deleteLanguage);
router.post("/code", authGuard, deleteController.deleteCode);
router.post("/message",authGuard,deleteController.deleteMessage);

module.exports = router;
