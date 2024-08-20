import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

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

const recipeSchema = new mongoose.Schema({
    label: { type: String, required: true },
    image: { type: String, required: true },
    source: { type: String, required: true },
    url: { type: String, required: true },
    dietLabels: [{ type: String }],
    healthLabels: [{ type: String }],
    ingredients: [{ type: String }],
    calories: { type: Number },
    totalTime: { type: Number },
    cuisineType: [{ type: String }],
    mealType: [{ type: String }],
    dishType: [{ type: String }],
    // totalNutrients: {
    //     type: Map,
    //     of: {
    //         label: String,
    //         quantity: Number,
    //         unit: String
    //     },
    //     default: {}
    // }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;

// export default ConnectDB;
