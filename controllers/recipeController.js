import express from 'express';
import Recipe from '../models/db.js';
import fetchRecipes from '../service/edamamService.js';
import printPDFRoute from './printPDF.js'; // Import the printPDF routes

const router = express.Router();

// Handler to fetch and process recipes based on selected diet criteria
const getRecipes = async (req, res) => {
    try {
        // Extract diet and health query parameters from the request
        const dietCriteria = req.query.diet || [];
        const healthCriteria = req.query.health || [];

        // Function to capitalize the first letter of each word
        const capitalizeWords = (str) => str
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('-');

        // Function to convert string to lowercase
        const toLowerCase = (str) => str.toLowerCase();

        // Normalize query parameters for MongoDB (capitalize first letter of each word)
        const dietCriteriaArray = Array.isArray(dietCriteria) ? dietCriteria.map(d => capitalizeWords(d)) : [capitalizeWords(dietCriteria)];
        const healthCriteriaArray = Array.isArray(healthCriteria) ? healthCriteria.map(h => capitalizeWords(h)) : [capitalizeWords(healthCriteria)];

        // Normalize query parameters for Edamam API (all lowercase)
        const dietCriteriaArrayLower = dietCriteriaArray.map(d => toLowerCase(d));
        const healthCriteriaArrayLower = healthCriteriaArray.map(h => toLowerCase(h));

        // Construct a query object for MongoDB
        const query = {};

        if (dietCriteriaArray.length > 0) {
            query.dietLabels = { $all: dietCriteriaArray };
        }

        if (healthCriteriaArray.length > 0) {
            query.healthLabels = { $all: healthCriteriaArray };
        }

        // Check the database for available recipes
        let recipes = await Recipe.find(query, { _id: 0, __v: 0 }).exec();
        let dataFetchedFrom;
        
        if (recipes.length < 12) {
            // Fetch recipes from the Edamam API
            const queryString = dietCriteriaArrayLower.map(diet => `diet=${encodeURIComponent(diet)}`).join('&') +
                                '&' +
                                healthCriteriaArrayLower.map(health => `health=${encodeURIComponent(health)}`).join('&');
            const data = await fetchRecipes(`&${queryString}`);

            // Check if 'hits' property exists and is not an empty array in the API response
            if (data && data.hits && data.hits.length > 0) {
                    console.log('Recipes fetched from Edamam API service provider.');
                    dataFetchedFrom = 'Edamam API'

                // Slice the first 100 recipes
                const fetchedRecipes = data.hits.slice(0, 100).map(hit => ({
                    title: hit.recipe.label, // Recipe title
                    image: hit.recipe.image, // Recipe image URL
                    source: hit.recipe.source || 'Unknown', // Source of the recipe
                    instructionsUrl: hit.recipe.url || 'No URL available', // URL for recipe instructions
                    dietLabels: hit.recipe.dietLabels.map(label => capitalizeWords(label)) || [], // Normalize to match MongoDB format
                    healthLabels: hit.recipe.healthLabels.map(label => capitalizeWords(label)) || [], // Normalize to match MongoDB format
                    ingredients: hit.recipe.ingredientLines || [], // List of ingredients
                    servingSize: hit.recipe.yield !== undefined ? hit.recipe.yield : null, // Number of servings
                    caloriesPerServing: hit.recipe.calories !== undefined ? hit.recipe.calories / hit.recipe.yield : null, // Calories per serving (kcal)
                    totalTime: hit.recipe.totalTime !== undefined ? hit.recipe.totalTime : null, // totalTime = prep time + cooking time (in minutes)
                    cuisineType: hit.recipe.cuisineType || [], // e.g. Australian, Italian, Japanese
                    mealType: hit.recipe.mealType || [], // e.g. breakfast, lunch, dinner
                    dishType: hit.recipe.dishType || [], // The food category (e.g., main course, salad, soup)
                    totalNutrients: hit.recipe.totalNutrients || {}, // Nutritional information
                }));

                // Save the fetched recipes to the MongoDB database
                await Recipe.insertMany(fetchedRecipes);

                // Update the recipes variable with the new fetched data
                recipes = fetchedRecipes;
            } else {
                // Return a 404 error if no recipes are found
                return res.status(404).json({ error: 'No recipes found' });
            }
        } else {
            console.log('Recipes fetched from MongoDB.');
            dataFetchedFrom = 'MongoDB';
        }

        // Shuffle and select 12 recipes
        const shuffledRecipes = recipes.sort(() => 0.5 - Math.random());
        const selectedRecipes = shuffledRecipes.slice(0, 12);

        // Return the recipes as a JSON response
        res.json({ dataFetchedFrom, recipes: selectedRecipes });

    } catch (error) {
        // Log and return a 500 error if an exception occurs
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Define the route to handle GET requests to '/recipes'
router.get('/', getRecipes);

// Use the printPDF routes module
router.use('/print', printPDFRoute);

export default router;
