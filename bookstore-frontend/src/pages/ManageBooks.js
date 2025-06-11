import React, { useState, useEffect } from 'react';
import{useCart} from '../context/CartContext';
import axios from 'axios';
import { Card, Col, Container, Row, Button, Form } from 'react-bootstrap';
import { set } from 'mongoose';
//import {useNavigate} from 'react-router-dom';
const ManageBooks = () => {
  const userRole = localStorage.getItem('role'); // Retrieve the user's role

  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [newBook, setNewBook] = useState({ title: '', author: '', price: '' ,genre: '', stock:''});
  const [priceUpdates,setPriceUpdates]=useState({})
  const [stockUpdates,setStockUpdates]=useState({})
  const{cart,dispatch}=useCart();
  const [successMessage, setSuccessMessage] = useState('');

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/books', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (error) {
      setError('Failed to fetch books');
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post('http://localhost:5000/api/auth/refresh-token', { refreshToken });
      localStorage.setItem('token', response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  };

  const handleCreateBook = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("token:",token)
      console.log('New book payload: ', newBook);
      const response = await axios.post('http://localhost:5000/api/books', newBook, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks([...books, response.data]);
      setNewBook({ title: '', author: '', price: '',genre: '',stock:'' }); // Clear the input fields after creating a book
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError('You are not authorized to create books. Only admins can perform this action.');
        } else if (error.response.status === 403) {
          setError(error.response.data.message); // Use the message from the backend
        } else {
          setError('Failed to create book');
        }
      } else {
        setError('An unexpected error occurred');
      }
      console.error('Error creating book:', error);
    }
  };

  const handleUpdateBook = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const updatedPrice= priceUpdates[id];
      if(!updatedPrice || isNaN(updatedPrice)){
        setError('Please enter a valid price');
        return;
      }
      const response = await axios.put(`http://localhost:5000/api/books/${id}`, {price:updatedPrice}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(books.map((book) => (book._id === id ? response.data : book)));
      setPriceUpdates({...priceUpdates, [id]: ''}); // Clear the input field after updating
    } catch (error) {
      setError('Failed to update book');
      console.error('Error updating book:', error);
    }
  };

  const handleUpdateStock=async(id)=>{
    try{
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const updatedStock=stockUpdates[id];
      if(!updatedStock || isNaN(updatedStock)){
        setError('Please enter a valid stock');
        return;
      }
      const response = await axios.put(`http://localhost:5000/api/books/${id}`, {stock:updatedStock},{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      });
      setBooks(books.map((book)=>(book._id===id ?{...book, stock:updatedStock}:book))); 
      setStockUpdates({...stockUpdates,[id]:''}); // Clear the input field after updating
    } catch(error){
      setError('Failed to update stock');
      console.error('Error updating stock:', error);
    }
  }

  const handleDeleteBook = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(books.filter((book) => book._id !== id));
    } catch (error) {
      setError('Failed to delete book');
      console.error('Error deleting book:', error);
    }
  };

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      setError('You are not authorized to manage books. Only admins can access this section.');
     // navigate('/'); // Redirect non-admin users
    }
    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (book) => {
    dispatch({ type: 'ADD_TO_CART', payload: {
      _id:book._id,
      title:book.title,
      author:book.author,
    } });
    setSuccessMessage(`${book.title} added to the cart successfully!`);

    setTimeout(()=>{
      setSuccessMessage('');
    },5000 );
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Manage Books</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form className="mb-4">
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter book author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter book price"
            value={newBook.price}
            onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="genre">
  <Form.Label>Genre</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter book genre"
    value={newBook.genre|| ""} // Bind the genre field to the state
    onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })} // Update the genre field in the state
  />
</Form.Group>

  <Form.Group controlId="stock">
  <Form.Label>Stock</Form.Label>
  <Form.Control
    type="number"
    placeholder="Enter book stock"
    value={newBook.stock|| ""} // Bind the stock field to the state
    onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })} // Update the stock field in the state
  />

</Form.Group>

<Form.Group controlId="Published Date">
  <Form.Label>Published Date</Form.Label>
  <Form.Control
    type="date"
    placeholder="Enter book published Date"
    value={newBook.publishedDate|| ""} // Bind the stock field to the state
    onChange={(e) => setNewBook({ ...newBook, publishedDate: e.target.value })} // Update the stock field in the state
  />

</Form.Group>
        <Button className="mt-3" onClick={handleCreateBook}>
          Add Book
        </Button>
      </Form>
      <Row>
        {books.map((book) => (
          <Col key={book._id} sm={12} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Author: {book.author}</Card.Subtitle>
                <Card.Text>Price: {book.price}$</Card.Text>
                <Button
                   variant="primary"
                   onClick={() => handleAddToCart(book)}
                >
            Add to Cart
          </Button>
                <Card.Text>Genre: {book.genre}</Card.Text>
                <Card.Text>Stock: {book.stock}</Card.Text>
                <Card.Text> Published Date: {new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(book.publishedDate))}
</Card.Text>
                {userRole==='admin'?(
                  <>
                <Form.Group controlId={`price ${book._id}`} className='mb-3'>
                  <Form.Label>New Price:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder='Enter new price'
                    value={priceUpdates[book._id] || ''}
                    onChange={(e)=>setPriceUpdates({...priceUpdates,[book._id]: e.target.value})} 
                  />
                  
                </Form.Group>
                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleUpdateBook(book._id)}
                >
                  Update Price
                </Button>

                <Form.Group controlId={`stock ${book._id}`} className='mb-3'>
                  <Form.Label>Update Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder='Enter new stock'
                    value={stockUpdates[book._id] || ''}
                    onChange={(e)=>setStockUpdates({...stockUpdates,[book._id]: e.target.value})}
                  />
                </Form.Group>

                <Button
                  variant="warning"
                  className="me-2"
                  onClick={() => handleUpdateStock(book._id)}
                >
                  Update Stock
                </Button>

                
                <Button variant="danger" onClick={() => handleDeleteBook(book._id)}>
                  Delete
                </Button>
                </>
                ):(
                  <p className="text-danger">You are not authorized to perform these actions.</p>
          )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ManageBooks;