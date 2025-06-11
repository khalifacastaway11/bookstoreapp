const express = require('express');
const router = express.Router();
const paymentController = require('./controllers/paymentController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/create-payment-intent', authMiddleware, paymentController.createPaymentIntent);

module.exports = router;