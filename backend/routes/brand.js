const express = require('express');
const router = express.Router();
const {
    addBrand,
    getAllBrands,
    getBrandById,
    updateBrandById,
    deleteBrandById,
} = require('../handlers/brand-handler'); // Import brand handlers

/**
 * @swagger
 * /brand:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brand]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the brand
 *               
 *     responses:
 *       201:
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *       400:
 *         description: Invalid input
 */
router.post('/', async (req, res) => {
    const result = await addBrand(req.body);
    if (result.success) {
        res.status(201).json(result.data);
    } else {
        res.status(400).json({ error: result.error });
    }
});

/**
 * @swagger
 * /brand:
 *   get:
 *     summary: Get all brands
 *     tags: [Brand]
 *     responses:
 *       200:
 *         description: List of all brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 *       500:
 *         description: Server error
 */

router.get('/', async (req, res) => {
    const result = await getAllBrands();
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(500).json({ error: result.error });
    }
});

router.get('/:id', async (req, res) => {
    const result = await getBrandById(req.params.id);
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(result.error === 'Brand not found' ? 404 : 500).json({ error: result.error });
    }
});


router.put('/:id', async (req, res) => {
    const result = await updateBrandById(req.params.id, req.body);
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(result.error === 'Brand not found' ? 404 : 400).json({ error: result.error });
    }
});


router.delete('/:id', async (req, res) => {
    const result = await deleteBrandById(req.params.id);
    if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(result.error === 'Brand not found' ? 404 : 500).json({ error: result.error });
    }
});

module.exports = router;