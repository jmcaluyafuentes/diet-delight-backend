import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.DB_URI)
    .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected' : "Mongoose failed to connect"))
    .catch(err => console.error(err))

// Schema for nutrient information
const nutrientSchema = new mongoose.Schema({
    label: String, // Name of the nutrient
    quantity: Number, // Amount of the nutrient
    unit: String // Unit of measurement for the nutrient
});

// Schema for recipe information
const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Recipe title
    image: { type: String, required: true }, // Recipe image UR
    source: { type: String, required: true }, // Source of the recipe
    instructionsUrl: { type: String, required: true }, // URL for recipe instructions
    dietLabels: [{ type: String }], // Commonly used nutrient level aspects of the recipe.
    healthLabels: [{ type: String }], // Commonly used ingredient level aspects of the recipe.
    ingredients: [{ type: String }], // List of ingredients
    servingSize: { type: Number }, // Number of servings
    caloriesPerServing: { type: Number }, // Calories per serving (kcal)
    totalTime: { type: Number }, // totalTime = prep time + cooking time (in minutes)
    cuisineType: [{ type: String }], // e.g. Australian, Italian, Japanese
    mealType: [{ type: String }], // e.g. breakfast, lunch, dinner
    dishType: [{ type: String }], // The food category (e.g., main course, salad, soup)
    totalNutrients: [nutrientSchema], // Nutritional information
});

// Create a model for the Recipe schema
const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
