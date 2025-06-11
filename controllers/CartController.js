const Cart = require('../models/Cart'); // Import the Cart model
const Product = require('../models/Product'); // Import the Product model (if needed)

// Add an item to the cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the cart exists for the user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      // Update the quantity if the product is already in the cart
      existingItem.quantity += quantity;
    } else {
      // Add the product to the cart
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Failed to add item to cart', error: error.message });
  }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the product from the cart
    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

    await cart.save();
    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Failed to remove item from cart', error: error.message });
  }
};

// Retrieve the cart
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId }).populate('items.productId'); // Populate product details
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error('Error retrieving cart:', error);
    res.status(500).json({ message: 'Failed to retrieve cart', error: error.message });
  }
};