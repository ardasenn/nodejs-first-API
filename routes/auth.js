const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.handleRegister);
router.post("/login", authController.handleLogin);
router.post("/refresh", authController.handleRefreshRoken);

module.exports = router;
