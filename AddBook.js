// addBook.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("./models/Book"); // Adjust the path if necessary

dotenv.config(); // Load environment variables


 mongoose
   .connect(process.env.MONGO_URI, {
     useNewUrlParser: true,
//useUnifiedTopology: true,
   })
   .then(() => {
     console.log("Connected to MongoDB");
     addBook(); // Call the function to add a book
   })
   .catch((err) => {
     console.error("MongoDB connection error:", err);
   });

// Function to add a book
// Function to insert a new book
const addBook = async () => {
  try {
    const newBook = new Book({
     
    });

    await newBook.save();
    console.log("Book inserted successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting book:", error);
  }
};
