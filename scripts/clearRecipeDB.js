import mongoose from 'mongoose';
import Recipe from '../models/db.js';

// Function to clear all documents in the Recipe collection
const clearDatabase = async () => {
    try {
        await Recipe.deleteMany({});
        console.log('Database cleared.');
    } catch (error) {
        console.error('Error clearing database:', error);
    } finally {
        // Close the database connection
        mongoose.connection.close(); 
    }
};

// Connect to MongoDB and invoke the clearDatabase function
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        // Clear database
        await clearDatabase(); 
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

