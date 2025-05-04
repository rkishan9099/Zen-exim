require('dotenv').config();
const mongoose = require('mongoose');
const ProductMasterModel = require('../model/product_master');
const connectDB = require('../config/database');

// Sample product data
const products = [
  { name: 'Cotton Fabric', rate: 150.00, unit: 'meter' },
  { name: 'Silk Fabric', rate: 450.00, unit: 'meter' },
  { name: 'Denim Fabric', rate: 250.00, unit: 'meter' },
  { name: 'Wool Fabric', rate: 350.00, unit: 'meter' },
  { name: 'Polyester Fabric', rate: 120.00, unit: 'meter' },
  { name: 'Linen Fabric', rate: 280.00, unit: 'meter' },
  { name: 'Leather Material', rate: 550.00, unit: 'sqft' },
  { name: 'Buttons', rate: 5.00, unit: 'piece' },
  { name: 'Zippers', rate: 8.00, unit: 'piece' },
  { name: 'Thread Spool', rate: 25.00, unit: 'piece' }
];

async function addDummyProducts() {
  try {
    // Connect to MongoDB using the database configuration
    await connectDB();
    console.log('Connected to MongoDB successfully');

    // Delete existing products
    await ProductMasterModel.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    const result = await ProductMasterModel.insertMany(products);
    console.log(`Added ${result.length} dummy products successfully`);

    console.log('Sample products:');
    console.log(result);
  } catch (error) {
    console.error('Error adding dummy products:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the migration
addDummyProducts();