const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

console.log("JWT_SECRET: ",JWT_SECRET)
console.log("JWT_REFRESH_SECRET: ",JWT_REFRESH_SECRET)

if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error("JWT_SECRET or JWT_REFRESH_SECRET is not defined in the environment variables");
}

// Generate Access Token
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "15m" });
};

// Generate Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

// Register new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    user = new User({ username, email, password });
    await user.save();
    const token = generateAccessToken(user);
    res.status(201).json({ token , role:user.role});
  } catch (err) {
    console.error("Error occurred while registering user", err);
    res.status(500).send("Server error while registering user");
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePasswords(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.json({ message: "Login successful", accessToken, refreshToken,role: user.role });
  } catch (err) {
    console.error("Error occurred while logging in user", err);
    res.status(500).send("Server error while logging in user");
  }
};

// Logout user
exports.logout = (req, res) => {
  res.clearCookie("token");
  req.session.destroy((err) => {
    if (err) {
      console.error("Error occurred while logging out", err);
      return res.status(500).send("Server error while logging out");
    }
    res.json({ message: "Logout successful" });
  });
};

// Refresh token
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    const newRefreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken , role:user.role});
  } catch (err) {
    console.error('Error refreshing token:', err);
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).send("Server error while fetching profile");
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findById(req.user.id);
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).send("Server error while updating profile");
  }
};

// Send password reset email
exports.sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      text: `Click the link to reset your password: ${resetLink}`,
    };
    await transporter.sendMail(mailOptions);
    res.json({ message: "Password reset email sent" });
  } catch (err) {
    console.error("Error sending password reset email:", err);
    res.status(500).send("Server error while sending password reset email");
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Error resetting password:", err);
    res.status(500).send("Server error while resetting password");
  }
};