import React from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const { cart, dispatch } = useCart();
  const navigate=useNavigate();
  const handleRemoveFromCart = (uniqueId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: uniqueId });//use uniqueId to remove item
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <ListGroup>
          {cart.map((item) => (
            <div key={item._id}>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{item.title}</h5>
                  <p className="mb-0">Price: {item.price}$</p>
                </div>
                <Button variant="danger" onClick={() => handleRemoveFromCart(item.uniqueId)}>
                  Remove
                </Button>
              </ListGroup.Item>
              <div>
                {/* Cart items */}
                <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
              </div>
            </div>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Cart;