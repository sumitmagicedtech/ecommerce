const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const app = express();
const PORT = 3000;
const categoryRoutes = require('./routes/category'); // Adjust the path as necessary
const cors = require('cors');
// const brandRoutes = require('./routes/product'); // Ensure this path is correct
const brandRoutes = require('./routes/brand');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product'); // Ensure this path is correct
// MongoDB connection URI
const MONGO_URI = 'mongodb://localhost:27017/ecommerce'; // Replace with your MongoDB URI

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies


/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the category
 */


// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API',
      version: '1.0.0',
      description: 'API documentation for the Ecommerce application',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.use('/category', categoryRoutes);
app.use('/brand', brandRoutes);
app.use('/product', productRoutes);
app.use('/', authRoutes);

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI); // No need for deprecated options
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit the process with failure
  }
};

// Call the connectDB function
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});