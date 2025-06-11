import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterBooks = () => {
  const [genre, setGenre] = useState('');
  const [books, setBooks] = useState([]);
  const[error,setError]=useState('');


  const fetchBooksByGenre= async(genre)=>{
    try{
      const token = localStorage.getItem('token');
      const response=await axios.get(`http://localhost:5000/api/books/filter?genre=${genre}`,{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch(error){
      setError('Failed to feth the book by genre');
      console.error('Error fetching books by genre: ', error);
    }
  }

  const handleFilter =  (e) => {
    e.preventDefault();
    if(genre.trim()===''){
      setError('Please enter a genre to filter ');
      return;
    }
    setError('');
    fetchBooksByGenre(genre);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Filter The Books</h1>
      <form onSubmit={handleFilter}>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">Filter the Books By Genre:</label>
          <input
            type="text"
            className="form-control"
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Filter</button>
      </form>
      <h2 className="mt-5">Results</h2>
      <div className="row">
        {books.map((book) => (
          <div key={book._id} className="col-md-4">
            <div className="card">
              {/* <img src={book.coverI,ImageUrl||'https://via.placeholder.com/150'} className="card-img-top" alt={book.title} /> */}
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text"> <strong>Author:</strong> {book.author}</p>
                <p className="card-text"><strong>Genre:</strong> {book.genre}</p>
                <p className="card-text"><strong>Published Date:</strong>{new Date(book.publishedDate).toLocaleDateString()}</p>
                <p className="card-text"><strong>Price:</strong> {book.price}$</p>
                <p className="card-text"><strong>Stock:</strong> {book.stock}</p>
            </div>
          </div>
        </div>
        ))}
        </div> 
        </div>
  );
}  
          

 export default FilterBooks;