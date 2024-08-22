import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

// Function to fetch recipes based on a query parameter
const fetchRecipes = async (query) => {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}${query}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        console.log('Error fetching data from Edamam API:', err);
    }
};

export default fetchRecipes;
