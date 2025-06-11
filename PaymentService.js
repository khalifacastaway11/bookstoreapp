const stripe = require('stripe')('your-secret-key-here'); // Replace with your Stripe secret key

const processPayment = async (paymentMethodId, amount) => {
  try {
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true, // Confirm the payment immediately
    });

    return paymentIntent; // Return the payment intent details
  } catch (error) {
    console.error('Error processing payment:', error);
    throw new Error('Payment processing failed');
  }
};

module.exports = { processPayment };