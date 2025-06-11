import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/books/search?query=${query}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Search The Books</h1>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <label htmlFor="query" className="form-label">Search Books By Name:</label>
          <input
            type="text"
            className="form-control"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <h2 className="mt-5">Results</h2>
      <div className="row">
        {books.map((book) => (
          <div key={book._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
                <p className="card-text"><strong>Author:</strong> {book.author}</p>
                <p className="card-text"><strong>Genre:</strong> {book.genre}</p>
                <p className="card-text"><strong>Published Date:</strong> {new Date(book.publishedDate).toLocaleDateString()}</p>
                <p className="card-text"><strong>Price:</strong> {book.price.toFixed(2)}$</p>
                <p className="card-text"><strong>Stock:</strong> {book.stock}</p>
          </div>
        </div>
      </div>
        ))}
      </div>
    </div>
                
  );
};

export default SearchBooks;