import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import recipeRoutes from '../controllers/recipeController.js';
import Recipe from '../models/db.js';

const app = express();
app.use(express.json());
app.use('/recipes', recipeRoutes);

describe('Recipe Controller Tests', () => {
  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear any existing data
    await Recipe.deleteMany({});
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });

  it('should return 400 if no recipes are provided', async () => {
    const response = await request(app).post('/recipes').send({ recipes: [] });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('No recipes provided');
  });

  it('should fetch recipes and return a successful response', async () => {
    const response = await request(app).get('/recipes');
    expect(response.status).toBe(200);
    expect(response.body.recipes).toBeDefined();
    expect(response.body.dataFetchedFrom).toBeDefined();
  });

  it('should handle errors gracefully', async () => {
    jest.spyOn(Recipe, 'find').mockImplementationOnce(() => {
      throw new Error('Database error');
    });
    const response = await request(app).get('/recipes');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');
  });
});