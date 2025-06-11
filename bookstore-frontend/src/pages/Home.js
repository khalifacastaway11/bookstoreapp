import React from 'react';
import {useNavigate} from 'react-router-dom';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5 text-center">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <Card.Title as="h1" className="mb-4">
                Welcome to <span style={{ color: '#007bff' }}>Khalifa's Bookstore</span>
              </Card.Title>
              <Card.Text className="lead">
                Discover a world of knowledge and imagination. Explore our collection of books and enjoy exclusive offers tailored just for you.
              </Card.Text>
              <Button variant="primary" size="lg" className="mt-3"
              
              onClick={() =>
               {  
                console.log('Navigating to /books');
                navigate('/books')
                }}>
                Browse Books
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;

