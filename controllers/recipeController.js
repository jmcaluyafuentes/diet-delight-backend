import express from 'express';
import Recipe from '../models/db.js';
import fetchRecipes from '../service/edamamService.js';

const router = express.Router();

// Handler to fetch and process recipes based on selected diet criteria
const getRecipes = async (req, res) => {
    try {
        // Extract diet and health query parameters from the request
        const dietCriteria = req.query.diet || [];
        const healthCriteria = req.query.health || [];

        // Ensure dietCriteria and healthCriteria are arrays
        const dietCriteriaArray = Array.isArray(dietCriteria) ? dietCriteria : [dietCriteria];
        const healthCriteriaArray = Array.isArray(healthCriteria) ? healthCriteria : [healthCriteria];

        // Construct a query string for the Edamam API
        const query1 = dietCriteriaArray.map(diet => `diet=${encodeURIComponent(diet)}`).join('&');
        const query2 = healthCriteriaArray.map(health => `health=${encodeURIComponent(health)}`).join('&');
        const query = query1 + '&' + query2;

        // Fetch recipes from the Edamam API
        const data = await fetchRecipes(`&${query}`);

        // Check if 'hits' property exists in the API response
        if (data && data.hits) {
            // Map the first 10 recipes from the 'hits' array
            const recipes = data.hits.slice(0, 12).map(hit => ({
                title: hit.recipe.label, // Recipe title
                image: hit.recipe.image, // Recipe image URL
                source: hit.recipe.source || 'Unknown', // Source of the recipe
                instructionsUrl: hit.recipe.url || 'No URL available', // URL for recipe instructions
                dietLabels: hit.recipe.dietLabels || [], // Commonly used nutrient level aspects of the recipe.
                healthLabels: hit.recipe.healthLabels || [], // Commonly used ingredient level aspects of the recipe.
                ingredients: hit.recipe.ingredientLines || [], // List of ingredients
                calories: hit.recipe.calories || 0, // Total calories
                totalTime: hit.recipe.totalTime || 0, // totalTime = prep time + cooking time (in minutes)
                cuisineType: hit.recipe.cuisineType || [], // e.g. Australian, Italian, Japanese
                mealType: hit.recipe.mealType || [], // e.g. breakfast, lunch, dinner
                dishType: hit.recipe.dishType || [], // The food category (e.g., main course, salad, soup)
                totalNutrients: hit.recipe.totalNutrients || {}, // Nutritional information
                servingSize: hit.recipe.yield || 0, // Number of servings
            }));

            // Save the recipes to the MongoDB database
            await Recipe.insertMany(recipes);

            // Return the recipes as a JSON response
            res.json(recipes);
        } else {
            // Return a 404 error if no recipes are found
            res.status(404).json({ error: 'No recipes found' });
        }
    } catch (error) {
        // Log and return a 500 error if an exception occurs
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Define the route to handle GET requests to '/recipes'
router.get('/', getRecipes);

export default router;
