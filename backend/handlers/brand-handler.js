const Brand = require('./../db/brand'); // Import the Brand model from the database

// Add a new brand
async function addBrand(data) {
    try {
        const brand = new Brand(data);
        const savedBrand = await brand.save();
        return { success: true, data: savedBrand };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Get all brands
async function getAllBrands() {
    try {
        const brands = await Brand.find();
        return { success: true, data: brands };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Get a brand by ID
async function getBrandById(id) {
    try {
        const brand = await Brand.findById(id);
        if (!brand) {
            return { success: false, error: 'Brand not found' };
        }
        return { success: true, data: brand };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Update a brand by ID
async function updateBrandById(id, data) {
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(id, data, { new: true });
        if (!updatedBrand) {
            return { success: false, error: 'Brand not found' };
        }
        return { success: true, data: updatedBrand };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Delete a brand by ID
async function deleteBrandById(id) {
    try {
        const deletedBrand = await Brand.findByIdAndDelete(id);
        if (!deletedBrand) {
            return { success: false, error: 'Brand not found' };
        }
        return { success: true, message: 'Brand deleted successfully' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

module.exports = {
    addBrand,
    getAllBrands,
    getBrandById,
    updateBrandById,
    deleteBrandById,
};