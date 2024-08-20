import express from 'express'
import ConnectDB from './models/db.js';
import recipeRoutes from './controllers/recipeController.js'

const app = express();

// Connect to MongoDB Atlas
ConnectDB();

// Use recipe routes
app.use(recipeRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Diet-Delight API');
});

app.listen(4001, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server running');
    }
});