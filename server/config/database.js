const mongoose = require('mongoose');

// Database configuration
const dbConfig = {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/zen_exim',
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    }
};

// Create a connection function
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(dbConfig.url, dbConfig.options);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
        // Handle connection events
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected. Attempting to reconnect...');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;