const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({

    name: String,
    email: String,
    password: String,
    isAdmin: Boolean


    //     name: {
    //         type: String,
    //         required: true,
    //         trim: true,
    //     },
    //     email: {
    //         type: String,
    //         required: true,
    //         unique: true,
    //         trim: true,
    //     },
    //     password: {
    //         type: String,
    //         required: true,
    //     },
    //     isAdmin: {
    //         type: Boolean,
    //         default: false,
    //     },
    // }, {
    //     timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the User model
const User = mongoose.model('users', userSchema);

module.exports = User;