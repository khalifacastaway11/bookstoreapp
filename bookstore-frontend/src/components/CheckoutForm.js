import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RIRZNAZ1zYbd5TYuQndWNmPEI3uWh45DenEfyMu0qDkSYpRnF22EAL0YFb3EhfJIz8x70RQyFHXLTMUlaD4VdeF00tYvmc5aW"); // Replace with your Stripe publishable key

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart } = useCart(); // Access the cart from context
  const [isPayPal, setIsPayPal] = useState(false); // Toggle between Stripe and PayPal

  const handleStripeSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email"); // Retrieve the user's email from localStorage
        const items = cart;
        const amount = cart.reduce((total, item) => total + item.price * 100, 0); // Calculate the total amount in cents

        const response = await axios.post(
          "http://localhost:5000/api/orders",
          {
            email, // Include the user's email
            items,
            paymentMethodId: paymentMethod.id,
            amount, // Replace with the actual amount
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Payment processed successfully:", response.data);
        alert("Payment successful!");
      } catch (backendError) {
        console.error("Error processing payment:", backendError);
        alert("Failed to process payment. Please try again.");
      }
    } else {
      console.error("Payment error:", error);
      alert("Payment failed. Please check your card details and try again.");
    }
  };

  const handlePayPalSuccess = async (details) => {
    try {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email"); // Retrieve the user's email from localStorage
      const items = cart;
      const amount = cart.reduce((total, item) => total + item.price * 100, 0); // Calculate the total amount in cents

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          email, // Include the user's email
          items,
          paypalOrderId: details.id, // Include PayPal order ID
          amount, // Replace with the actual amount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("PayPal payment processed successfully:", response.data);
      alert("Payment successful!");
    } catch (backendError) {
      console.error("Error processing PayPal payment:", backendError);
      alert("Failed to process payment. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="text-center mb-4">Choose Payment Method</h2>
      <div className="text-center mb-4">
        <button
          className={`btn ${!isPayPal ? "btn-primary" : "btn-outline-primary"} me-2`}
          onClick={() => setIsPayPal(false)}
        >
          Pay with Stripe
        </button>
        <button
          className={`btn ${isPayPal ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setIsPayPal(true)}
        >
          Pay with PayPal
        </button>
      </div>

      {!isPayPal ? (
        <form onSubmit={handleStripeSubmit}>
          <CardElement />
          <button type="submit" className="btn btn-success mt-3" disabled={!stripe}>
            Pay Now
          </button>
        </form>
      ) : (
        <PayPalScriptProvider options={{ "client-id": "AU2FbgM4dfWujN7tiEmVxBkU_DLF9bcUnhsspBdOHNKwn-OkqGVEC98U91xBKg6JUSqK9P7EMvrcQ-r7" }}>
          <PayPalButtons
            createOrder={(data, actions) => {
              const amount = cart.reduce((total, item) => total + item.price, 0); // Calculate total amount in dollars
              if(amount <= 0) {
                alert("Cart is empty ")
                return;
              }
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount.toFixed(2), // Convert to string with 2 decimal places
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                console.log("PayPal payment successful:", details);
                handlePayPalSuccess(details);
              });
            }}
            onError={(err) => {
              console.error("PayPal payment error:", err);
              alert(`PayPal payment failed: ${err.message}`);
            }}
          />
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default CheckoutForm;