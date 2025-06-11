const express = require("express");
const router = express.Router();
const { authMiddleware, adminMiddleware, authorize } = require("../middlewares/authMiddleware");

// Example of a protected route
router.get("/protected-route", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to the protected route!", user: req.user });
});

router.get("/admin", authMiddleware, authorize(['admin']), (req, res) => {
  res.json({ message: "Admin access granted" });
});

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;