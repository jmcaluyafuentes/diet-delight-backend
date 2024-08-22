import mongoose from 'mongoose';
import Recipe from '../models/db.js';

const clearDatabase = async () => {
    try {
        // Clear all documents in the Recipe collection
        await Recipe.deleteMany({});
        console.log('Database cleared.');
    } catch (error) {
        console.error('Error clearing database:', error);
    } finally {
        // Close the connection after clearing
        mongoose.connection.close(); 
    }
};

// Connect to MongoDB and clear the database
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        // Clear database
        await clearDatabase(); 
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

