import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

// Connect to MongoDB using mongoose
const connectDB = mongoose.connect(process.env.DB_URI)
    .then(m => console.log(m.connection.readyState === 1 ? 'Mongoose connected' : "Mongoose failed to connect"))
    .catch(err => console.error(err))

// const ConnectDB = async () => {
//     try {
//         await mongoose.connect(process.env.DB_URI);
//         console.log('Mongoose connected')
//     } catch (err) {
//         console.error('Mongoose failed to connect: ', err)
//     }
// }

// Define the schema for a Recipe
const recipeSchema = new mongoose.Schema({
    label: { type: String, required: true }, // Name of the recipe
    image: { type: String, required: true }, // URL to an image of the recipe
    source: { type: String, required: true }, // Source of the recipe
    url: { type: String, required: true }, // URL to the recipe
    dietLabels: [{ type: String }], // Array of diet labels
    healthLabels: [{ type: String }], // Array of health labels
    ingredients: [{ type: String }], // List of ingredients
    calories: { type: Number }, // Caloric content
    totalTime: { type: Number }, // Total time to prepare the recipe
    cuisineType: [{ type: String }], // Type of cuisine
    mealType: [{ type: String }], // Type of meal (e.g., breakfast, dinner)
    dishType: [{ type: String }], // Type of dish
    // totalNutrients: { // Uncomment to include detailed nutritional info
    //   type: Map,
    //   of: {
    //     label: String,
    //     quantity: Number,
    //     unit: String
    //   },
    //   default: {}
    // }
});

// Create a model for Recipe using the schema
const Recipe = mongoose.model('Recipe', recipeSchema);

// Create a model for Recipe using the schema
export default Recipe;

// export default ConnectDB;
