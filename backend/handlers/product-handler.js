const Product = require('./../db/product'); // Import the Product model from the database

// Add a new product
async function addProduct(data) {
    try {
        const product = new Product(data);
        const savedProduct = await product.save();
        return { success: true, data: savedProduct };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Get all products
async function getAllProducts() {
    try {
        const products = await Product.find();
        return { success: true, data: products };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Get a product by ID
async function getProductById(id) {
    try {
        const product = await Product.findById(id);
        if (!product) {
            return { success: false, error: 'Product not found' };
        }
        return { success: true, data: product };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Update a product by ID
async function updateProductById(id, data) {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
        if (!updatedProduct) {
            return { success: false, error: 'Product not found' };
        }
        return { success: true, data: updatedProduct };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Delete a product by ID
async function deleteProductById(id) {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return { success: false, error: 'Product not found' };
        }
        return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
};