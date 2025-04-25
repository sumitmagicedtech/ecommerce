const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean
});

// Create the User model
const User = mongoose.model('user', userSchema);
module.exports = User;