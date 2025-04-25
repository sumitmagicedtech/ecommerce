const mongoose = require('mongoose');

// Define the user schema
const categorySchema = new mongoose.Schema({

    name:String,
});

// Create the User model
const Category = mongoose.model('category', categorySchema);
module.exports = Category;