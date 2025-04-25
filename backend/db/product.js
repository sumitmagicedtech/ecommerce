const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    name: String,
    shortDescription: String,
    description: String,
    purchasePrice: Number,
    sellingPrice: Number,
    image: Array(String),
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
    },
    // brandId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Brands', // Reference to the Brand model
    // },
    // isFeatured: Boolean,
    // isNew: Boolean,
});

// Create the Product model
const Product = mongoose.model('product', productSchema);
module.exports = Product;