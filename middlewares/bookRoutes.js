const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import authMiddleware
const adminMiddleware = require('../middlewares/adminMiddleware'); // Import adminMiddleware

// Create a new book (admin only)
router.post('/', authMiddleware, adminMiddleware, bookController.createBook);

// Get all books (public)
router.get('/', bookController.getBooks);

// Get a single book by ID (public)
router.get('/:id', bookController.getBookById);

// Update a book by ID (admin only)
router.put('/:id', authMiddleware, adminMiddleware, bookController.updateBook);

// Delete a book by ID (admin only)
router.delete('/:id', authMiddleware, adminMiddleware, bookController.deleteBook);

// Filter books by genre (public)
router.get('/filter', bookController.filterBooksByGenre);

// Update the stock (admin only)
router.put('/books/:id', authMiddleware, adminMiddleware, bookController.updateStock);

module.exports = router;