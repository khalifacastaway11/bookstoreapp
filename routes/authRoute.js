const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
// home route

  
// Register Route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Logout route
router.post('/logout', authController.logout);

// Refresh token route
router.post('/refresh-token', authController.refreshToken);

// Profile route
router.get('/profile', authMiddleware, authController.getProfile);

// Profile update route
router.put('/profile', authMiddleware, authController.updateProfile);

// Admin route example
router.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.send("Admin access granted");
});

// Password reset routes
router.post('/send-password-reset-email', authController.sendPasswordResetEmail);
router.post('/reset-password', authController.resetPassword);

module.exports = router;