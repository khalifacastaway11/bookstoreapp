import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [price, setPrice] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const bookData = { title, author, description, category, publishedDate, price };
      if (editingBook) {
        await axios.put(`http://localhost:5000/api/books/${editingBook._id}`, bookData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://localhost:5000/api/books', bookData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      fetchBooks();
      setTitle('');
      setAuthor('');
      setDescription('');
      setCategory('');
      setPublishedDate('');
      setPrice('');
      setEditingBook(null);
    } catch (error) {
      console.error('Error creating/updating book:', error);
    }
  };

  const handleEdit = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setDescription(book.description);
    setCategory(book.category);
    setPublishedDate(book.publishedDate);
    setPrice(book.price);
    setEditingBook(book);
  };

  const handleDelete = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Book Management</h1>
      <form onSubmit={handleCreateOrUpdate}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="publishedDate" className="form-label">Published Date</label>
          <input
            type="date"
            className="form-control"
            id="publishedDate"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingBook ? 'Update Book' : 'Create Book'}
        </button>
      </form>
      <h2 className="mt-5">Books</h2>
      <ul className="list-group">
        {books.map((book) => (
          <li key={book._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{book.title}</h5>
              <p>{book.author}</p>
              <p>{book.category}</p>
              <p>{book.publishedDate}</p>
              <p>{book.price}</p>
            </div>
            <div>
              <button className="btn btn-secondary me-2" onClick={() => handleEdit(book)}>Edit</button>
              <button className="btn btn-danger" onClick={() => handleDelete(book._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookManagement;