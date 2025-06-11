const stripe = require('stripe')('sk_test_51RIRZNAZ1zYbd5TY6f3b3YX9ZItkcViwdsvJCJgTSvGIZXvzGRPXEucJtfiHc41TlrJc144QIzxkvLtBOdw9IyaC003Uh6kHmNsk_test_51RIRZNAZ1zYbd5TY6f3b3YX9ZItkcViwdsvJCJgTSvGIZXvzGRPXEucJtfiHc41TlrJc144QIzxkvLtBOdw9IyaC003Uh6kHmN'); // Replace with your Stripe secret key
const sendEmail = require('../utils/sendEmail'); // Import the sendEmail utility

exports.processPayment = async (req, res) => {
  try {
    const { paymentMethodId, amount, email } = req.body;

    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true, // Confirm the payment immediately
    });

    // Send order confirmation email
    await sendEmail(
      email,
      'Order Confirmation',
      `Thank you for your order! Your payment of ${(amount / 100).toFixed(2)} $ was successful.`
    );

    res.status(200).json({ message: 'Payment successful', paymentIntent });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
};