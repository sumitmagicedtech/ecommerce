const express = require('express');
const router = express.Router();
const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
} = require('../handlers/product-handler'); // Import product handlers

/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *               price:
 *                 type: number
 *                 description: The price of the product
 *               description:
 *                 type: string
 *                 description: A short description of the product
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
    const result = await addProduct(req.body);
    if (result.success) {
        res.status(201).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
});

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
router.get('/product', async (req, res) => {
    const result = await getAllProducts();
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(500).json({ error: result.error });
    }
});

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
    const result = await getProductById(req.params.id);
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(result.error === 'Product not found' ? 404 : 500).json({ error: result.error });
    }
});

/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Invalid input
 */
router.put('/:id', async (req, res) => {
    const result = await updateProductById(req.params.id, req.body);
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(result.error === 'Product not found' ? 404 : 400).json({ error: result.error });
    }
});

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
    const result = await deleteProductById(req.params.id);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(result.error === 'Product not found' ? 404 : 500).json({ error: result.error });
    }
});

module.exports = router;