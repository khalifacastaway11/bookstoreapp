import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Container, Row,Form,Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const Books=()=>{
  const [books, setBooks] = useState([]);
    const [error,setError]=useState('');
    const [stockUpdates,setStockUpdates]=useState({})
    const{cart,dispatch}=useCart();
    const [successMessage, setSuccessMessage] = useState('');
    
    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const response = await axios.get('http://localhost:5000/api/books'); // Ensure this URL is correct
          setBooks(response.data);
        } catch (error) {
          setError('Error fetching books');
          console.error('Error fetching books:', error);
        }
      };
  
      fetchBooks();
    }, []);
    
    const handleAddToCart=(book)=>{
      dispatch({type:'ADD_TO_CART',payload:book});
      setSuccessMessage(`${book.title} added to the cart successfully!`);
    }

    return(
        <Container className=" mt-5">
        <h1 className="text-center mb-4">Book List</h1>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {successMessage && <div className="alert alert-success text-center">{successMessage}</div>}
        <Row>
            {books.map((book) => (
                <Col key={book._id} sm={12} md={6} lg={4} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                      <Card.Text>
                        <strong>Author:</strong> {book.author}<br/>
                        <strong>Description:</strong> {book.description}<br/>
                        <strong>Category:</strong> {book.category}<br/>
                        <strong>Published Date:</strong> {new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(book.publishedDate))}<br/>
                        <strong>Price:</strong> {book.price}$<br/>
                        <Button variant="primary" onClick={() => handleAddToCart(book)}>
                          Add to Cart
                        </Button>
                      </Card.Text>
                        </Card.Body>
                        </Card>
                        </Col>
                    ))}

                 </Row>
               </Container>
                    );
                  }
     export default Books;
                

            

