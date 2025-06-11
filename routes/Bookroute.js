//routes/Bookroute.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');

const Book = require('../models/Book');

//create new book (Admin only)
router.post("/",authMiddleware,adminMiddleware, bookController.createBook);

//get all books
router.get("/", bookController.getBooks);

//search books
router.get("/search", bookController.searchBooks);

//Filter books by genre
router.get("/filter", bookController.filterBooksByGenre);

//get a single book by ID
router.get("/:id",bookController.getBookById);

//update book by id (Admin only)
router.put("/:id",authMiddleware,adminMiddleware, bookController.updateBook);

//delete book by id (Admin only)
router.delete("/:id",authMiddleware,adminMiddleware, bookController.deleteBook);


module.exports = router;