const profileController = require("./../controllers/profileController");
const express = require("express");
const router = express.Router();

router.use(
  "/view",
  profileController.isProfileReady,
  profileController.viewProfile
);

router.post("/message",profileController.sendMessage);

module.exports = router;
