const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');

//router for creating an order 
router.post('/orders',orderController.createOrder);
module.exports = router;