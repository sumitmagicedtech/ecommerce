const mongoose = require('mongoose');

// Define the user schema
const wishListSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
    },
    productId:Array(String)
});

// Create the User model
const Wishlist = mongoose.model('wishlist', wishListSchema);
module.exports = Wishlist;