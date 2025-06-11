const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');

dotenv.config();

//const url ="mongodb+srv://khalifacastaway:asd100200@bookstore.4jgcl.mongodb.net/";


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  //  useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    addBooks(); // Call the function to add books
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });


//function to addbook
// Function to add books to the database
const addBooks = async () => {
  try {
    const books = [
      {
        
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 10.99,
        genre: "Classic",
        publishedDate: new Date("1925-04-10"),
        stock: 5,
      },
      {
        
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 8.99,
        genre: "Fiction",
        publishedDate: new Date("1960-07-11"),
        stock: 10,
      },
      {
        
        title: "1984",
        author: "George Orwell",
        price: 9.99,
        genre: "Dystopian",
        publishedDate: new Date("1949-06-08"),
        stock: 7,
      },
      {
        
        title: "Moby Dick",
        author: "Herman Melville",
        price: 11.99,
        genre: "Adventure",
        publishedDate: new Date("1851-11-14"),
        stock: 3,
      },
      {
        
        title: "Pride and Prejudice",
        author: "Jane Austen",
        price: 7.99,
        genre: "Romance",
        publishedDate: new Date("1813-01-28"),
        stock: 12,
      },
      {
        
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        price: 9.49,
        genre: "Fiction",
        publishedDate: new Date("1951-07-16"),
        stock: 8,
      },
      {
        
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 10.49,
        genre: "Fantasy",
        publishedDate: new Date("1937-09-21"),
        stock: 9,
      },
      {
        
        title: "Brave New World",
        author: "Aldous Huxley",
        price: 8.49,
        genre: "Science Fiction",
        publishedDate: new Date("1932-08-18"),
        stock: 6,
      },
      {
        
        title: "War and Peace",
        author: "Leo Tolstoy",
        price: 12.99,
        genre: "Historical Fiction",
        publishedDate: new Date("1869-01-01"),
        stock: 4,
      },
      {
        
        title: "The Odyssey",
        author: "Homer",
        price: 9.99,
        genre: "Epic",
        publishedDate: new Date("800-01-01"),
        stock: 7,
      },
      {
        
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        price: 11.49,
        genre: "Philosophical Fiction",
        publishedDate: new Date("1866-01-01"),
        stock: 5,
      },
      {
        
        title: "Jane Eyre",
        author: "Charlotte Brontë",
        price: 7.99,
        genre: "Gothic Fiction",
        publishedDate: new Date("1847-10-16"),
        stock: 10,
      },
      {
        
        title: "Wuthering Heights",
        author: "Emily Brontë",
        price: 8.99,
        genre: "Gothic Fiction",
        publishedDate: new Date("1847-12-01"),
        stock: 6,
      },
      {
        
        title: "The Divine Comedy",
        author: "Dante Alighieri",
        price: 10.99,
        genre: "Epic Poetry",
        publishedDate: new Date("1320-01-01"),
        stock: 2,
      },
      {
        
        title: "Les Misérables",
        author: "Victor Hugo",
        price: 13.49,
        genre: "Historical Fiction",
        publishedDate: new Date("1862-01-01"),
        stock: 4,
      },
    ];

    // Insert the books into the database
    await Book.insertMany(books);
    console.log('Books added successfully!');
    console.log(books);
    // Close the database connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding books:', error);
  }
};