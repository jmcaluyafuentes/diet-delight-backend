import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

// Function to fetch recipes based on a query parameter
const fetchRecipes = async (query) => {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}${query}`;
    
    try {
        // Send a GET request to the Edamam API
        const response = await fetch(url);
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse and return the JSON data
        return await response.json();
    } catch (err) {
        // Log errors that occur during the fetch
        console.log('Error fetching data from Edamam API:', err);
    }
};

// Export the fetchRecipes function for use in other modules
export default fetchRecipes;
