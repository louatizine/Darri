const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Get User Profile (Protected)
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
