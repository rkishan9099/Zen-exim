require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/product");
const invoiceRoutes = require('./routes/invoice');
const errorHandler = require("./middleware/error");
const connectDB = require("./config/database");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database connection
connectDB();

// Routes
app.use("/api/products", productRoutes);
app.use('/api/invoices', invoiceRoutes);

// Error handling middleware
app.use(errorHandler);

// Handle unhandled routes
// app.use('*.splat', (req, res) => {
//     res.status(404).json({
//         status: 'error',
//         message: `Can't find ${req.originalUrl} on this server`
//     });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
