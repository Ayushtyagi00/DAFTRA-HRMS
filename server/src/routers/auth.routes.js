const express = require("express");
const router = express.Router();
const {
  validateLoginMiddleware,
  validateRegisterMiddleware,
} = require("../middleware/validate.middleware.js");
const { login, signup } = require("../controller/auth.controller");

router.post("/login", validateLoginMiddleware, login);
router.post("/register", validateRegisterMiddleware, signup);

module.exports = router;
