const mongoose = require('mongoose');

// Define the user schema
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
    },
    productId:Array(String)
});

// Create the User model
const Cart = mongoose.model('cart', cartSchema);
module.exports = Cart;