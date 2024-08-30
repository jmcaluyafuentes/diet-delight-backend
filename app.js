import express from 'express'
import recipeRoutes from './controllers/recipeController.js'
import cors from 'cors'

const app = express();
app.use(cors()) 
app.use(express.json())

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to Diet-Delight API');
});

// Mount recipe routes to handle requests related to recipes
app.use('/recipes', recipeRoutes);

export default app
