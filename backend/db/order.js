const mongoose = require('mongoose');

// Define the user schema
const orderSchema = new mongoose.Schema({
date: Date,
status: Number,
items:Array(any)
});

// Create the User model
const Order = mongoose.model('order', orderSchema);
module.exports = Order;