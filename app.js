const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require('connect-mongo');
const authRoute = require("./routes/authRoute");
const bookRoute = require("./routes/Bookroute");
const protectedRoute = require("./routes/protectedRoute");
const authMiddleware = require("./middlewares/authMiddleware");
const path = require("path");
const cartRoutes=require("./routes/cartRoutes");
const Cart=require("./models/Cart");
const Product = require('./models/Product'); // Correct path
const OrderRoutes = require("./routes/OrderRoutes");

// Load environ"ment variables
require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PAYPAL_CLIENT_SECRET", process.env.PAYPAL_CLIENT_SECRET);
console.log("PAYPAL_CLIENT_ID", process.env.PAYPAL_CLIENT_ID);
const app = express();
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/cart', cartRoutes); // Use cart routes
app.use('/api',OrderRoutes)


// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Setup the session store
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'sessions',
  lifetime: 7 * 24 * 60 * 60 // session lifetime in seconds (1 week)
});

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'SESSION_SECRET', // Use a secure secret in production
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true in production for HTTPS
      httpOnly: true, // Helps prevent XSS attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // Session lifetime in milliseconds (1 week)
    },
  })
);

// Public Routes
app.use("/api/auth", authRoute);
app.use("/api/books", bookRoute);

// Protected Routes
app.use("/api/protected", authMiddleware.authMiddleware, protectedRoute);

// Centralized error handling
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send('Something went wrong!');
});




// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});