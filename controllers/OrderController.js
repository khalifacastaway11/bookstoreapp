const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const getPayPalAccessToken = require('../utility/paypal.js');
const fetch=require('node-fetch');

const verifyPayPalOrder = async (paypalOrderId) => {
  const accessToken = await getPayPalAccessToken();

  const response = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${paypalOrderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const orderDetails = await response.json();

  if (orderDetails.status !== 'APPROVED') {
    throw new Error('PayPal order is not approved');
  }

  return orderDetails;
};



exports.createOrder = async (req, res) => {
  try {
    // Process payment logic here...
    const { email, items , paymentMethodId,paypalOrderId,amount} = req.body;
    console.log('PayPal Order ID:', paypalOrderId);
     // Fetch PayPal access token
     const accessToken = await getPayPalAccessToken();

    // Verify the PayPal order
    const paypalResponse = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${paypalOrderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Use your PayPal access token
      },
    });

    const paypalorder=await paypalResponse.json();

    if (paypalOrder.status !== 'COMPLETED') {
      return res.status(400).json({ message: 'PayPal order is not completed' });
    }



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
      `Thank you for your order! Here are your items: ${JSON.stringify(items)}`
    );

    res.status(200).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};