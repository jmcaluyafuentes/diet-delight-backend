import express from 'express'
import recipeRoutes from './controllers/recipeController.js'
import cors from 'cors'

const app = express();
app.use(cors()) 
app.use(express.json())

// Define a root route
app.get('/', (req, res) => {
    res.send(`
    <h1>Welcome to Diet-Delight API</h1>
    <p>For more information and documentation, visit our <a href="https://github.com/jmcaluyafuentes/diet-delight-backend.git" target="_blank" rel="noopener noreferrer">GitHub repository</a>.</p>
    `);
});

// Mount recipe routes to handle requests related to recipes
app.use('/recipes', recipeRoutes);

export default app
