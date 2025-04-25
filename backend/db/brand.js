const mongoose = require('mongoose');

// Define the user schema
const brandSchema = new mongoose.Schema({
    name: String, // Defines a single field 'name' of type String
});

// Create the User model
const Brand = mongoose.model('brands', brandSchema); // Creates a Mongoose model for the 'brands' collection
module.exports = Brand; // Exports the model for use in other files