//controllers/bookcontrollers.js

const Book = require('../models/Book');

// Create new book
exports.createBook = async (req, res) => {
  try {
    console.log('Request body:', req.body); // Debug log
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error("Error creating book", err);
    res.status(500).send({ message: "Server Error while creating book" });
  }
};

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error("Error getting books", err);
    res.status(500).send({ message: "Server Error while getting books" });
  }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error("Error fetching book", err);
    res.status(500).send({ message: "Server Error while fetching a book" });
  }
};

// Update book by ID
exports.updateBook = async (req, res) => {
  try {
   
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error("Error updating book", err);
    res.status(500).send({ message: "Server Error while updating book" });
  }
};

// Delete book by ID
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book", err);
    res.status(500).send({ message: "Server Error while deleting book" });
  }
};

// Search books
exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const books = await Book.find({ $text: { $search: query } });
    res.json(books);
  } catch (err) {
    console.error("Error searching books", err);
    res.status(500).send("Server Error while searching books");
  }
};

// Filter books by genre
exports.filterBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.query;
    const books = await Book.find({ genre });
    res.json(books);
  } catch (err) {
    console.error("Error filtering books by genre", err);
    res.status(500).json("Failed filtering books by genre");
  }
};

// Update stock
exports.updateStock= async(req,res)=>{
  try{
    const{id}=req.params;
    const {stock}=req.body;
    if(!stock || isNaN(stock)){
      return res.status(400).json({message:"Invalid stock value"});
    }

    const updatedBook=await Book.findByIdAndUpdate(id,{stock},{new:true});
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json(updatedBook)
  } catch(error){
    console.error("Error updating stock",error);
    res.status(500).json({message:"Failed to update stock"});
  }
}