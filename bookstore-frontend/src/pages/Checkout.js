import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Card, Container, Row, Col } from "react-bootstrap";
import { PayPalScriptProvider,PayPalButtons } from "@paypal/react-paypal-js";
import {useCart} from '../context/CartContext';


const stripePromise = loadStripe("pk_test_51RIRZNAZ1zYbd5TYuQndWNmPEI3uWh45DenEfyMu0qDkSYpRnF22EAL0YFb3EhfJIz8x70RQyFHXLTMUlaD4VdeF00tYvmc5aW");

const Checkout = () => {

  

  const handlePayPalSuccess=(details)=>{
    console.log('payment successfull: ',details);
    alert(`Transaction completed by ${details.payer.name.given_name}`);
  }
  return (
    <div className="checkout-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0">
              <Card.Body>
                <h2 className="text-center mb-4 text-primary">Secure Checkout</h2>
                <p className="text-center text-muted mb-4">
                  Complete your payment securely using Stripe.
                </p>
                        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Checkout;