import express from 'express';
import Recipe from '../models/db.js';
import fetchRecipes from '../service/edamamService.js';

const router = express.Router();

// Handler to get 10 recipes from Edamam API
const getRecipes = async (req, res) => {
  try {
    const data = await fetchRecipes();
    if (data && data.hits) {
      // Extract the first 10 recipes from the hits array
      const recipes = data.hits.slice(0, 10).map(hit => ({
        label: hit.recipe.label,
        image: hit.recipe.image,
        source: hit.recipe.source || 'Unknown',
        url: hit.recipe.url || 'No URL available',
        dietLabels: hit.recipe.dietLabels || [],
        healthLabels: hit.recipe.healthLabels || [],
        ingredients: hit.recipe.ingredientLines || [],
        calories: hit.recipe.calories || 0,
        totalTime: hit.recipe.totalTime || 0,
        cuisineType: hit.recipe.cuisineType || [],
        mealType: hit.recipe.mealType || [],
        dishType: hit.recipe.dishType || [],
        totalNutrients: hit.recipe.totalNutrients || {}
      }));

      // Save recipes to the database
      await Recipe.insertMany(recipes);

      // Return the recipes to the frontend
      res.json(recipes);
    } else {
      res.status(404).json({ error: 'No recipes found' });
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Define the route to get 10 recipes
router.get('/recipes', getRecipes);

export default router;


