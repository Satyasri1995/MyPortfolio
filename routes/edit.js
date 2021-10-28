const express = require("express");
const router = express.Router();
const editController = require("../controllers/editController");
const profileController = require("./../controllers/profileController");
const authGuard = require("./../utils/auth/authGuard");

router.use(
  "/updateProfile",
  authGuard,
  editController.editPage
);

router.post(
  "/basicDetails",
  authGuard,
  profileController.isProfileReady,
  editController.editBasicDetails
);
router.post(
  "/about",
  authGuard,
  profileController.isProfileReady,
  editController.editAbout
);
router.post(
  "/service",
  authGuard,
  profileController.isProfileReady,
  editController.editService
);
router.post("/funfact", editController.editFunFact);
router.post(
  "/education",
  authGuard,
  profileController.isProfileReady,
  editController.editEducation
);
router.post(
  "/experience",
  authGuard,
  profileController.isProfileReady,
  editController.editExperience
);
router.post(
  "/language",
  authGuard,
  profileController.isProfileReady,
  editController.editLanguage
);
router.post(
  "/code",
  authGuard,
  profileController.isProfileReady,
  editController.editCode
);
router.post(
  "/quote",
  authGuard,
  profileController.isProfileReady,
  editController.editQuote
);

module.exports = router;
