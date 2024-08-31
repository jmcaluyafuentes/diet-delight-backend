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
    const response = await request(app).get('/recipes?diet=high-protein&health=egg-free');
    expect(response.status).toBe(200);
    expect(response.body.recipes).toBeDefined();
    expect(response.body.dataFetchedFrom).toBeDefined();
  });

  it('return 404 if no recipes are found', async () => {
    const response = await request(app).get('/recipes?diet=nonexistent-diet&health=nonexistent-health');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('No recipes found');
  });

  it('handle exception errors if there is an error when retrieving recipes', async () => {
    // Simulate a database disconnection to force an error
    await mongoose.disconnect();
  
    const response = await request(app).get('/recipes');
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Internal Server Error');

  });
});
