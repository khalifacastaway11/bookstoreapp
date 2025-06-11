const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/add',  cartController.addToCart);
router.post('/remove', cartController.removeFromCart);
router.get('/:userId', cartController.getCart);

module.exports = router;