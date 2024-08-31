import request from 'supertest';
import app from './app.js';
import mongoose from 'mongoose';
import recipeRoutes from './controllers/recipeController.js';
import Recipe from './models/db.js';

app.use('/recipes', recipeRoutes);

describe('Recipe Controller Tests', () => {
    beforeAll(async () => {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect('mongodb://localhost:27017/testdb', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });
        }
        await Recipe.deleteMany({});
        });

        afterAll(async () => {
        await mongoose.disconnect();
        });

        it('fetch recipes and return a successful response', async () => {
        const response = await request(app).get('/recipes?diet=high-protein&health=egg-free'); // Send HTTP GET Request to the API
        expect(response.status).toBe(200); // Check if the status code is 200 OK
        expect(response.body.recipes).toBeDefined(); // Check if the recipe is returned from the API endpoint
        expect(response.body.dataFetchedFrom).toBeDefined();
        });

        it('return 404 if no recipes are found', async () => {
        const response = await request(app).get('/recipes?diet=nonexistent-diet&health=nonexistent-health'); // Send HTTP GET Request to the API
        expect(response.status).toBe(404); // Check if the status code is 404 Not Found
        expect(response.body.error).toBe('No recipes found'); // Check if the response body is returning the correct error message.
        })

        it('throw exception errors if there is an error when retrieving recipes', async () => {
        await mongoose.disconnect(); // Disconnect from the MongoDB database to force an error

        const response = await request(app).get('/recipes'); // Send HTTP GET Request to the API
        expect(response.status).toBe(500); // Check if the status code is 500 Internal Server Error
        expect(response.body.error).toBe('Internal Server Error'); // Check if response body is returning the correct error message.

        });
});
