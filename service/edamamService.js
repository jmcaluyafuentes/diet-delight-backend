import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const query = 'chicken'

// Function to fetch recipes from the Edamam API
const fetchRecipes = async () => {
    const url = `https://api.edamam.com/search?q=${query}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`

    try {
        // Send a GET request to the API
        const response = await fetch(url);
        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse and return the JSON data
        return await response.json();
    } catch (err) {
        // Log any errors that occur during the fetch
        console.log('Error fetching data from Edamam API:', err);
    }
}

// // Testing the function
// const testFetchRecipes = async () => {
//     try {
//         const data = await fetchRecipes();
//         console.log(data.hits); // Output: All recipes filtered on ${query} parameter
//         // console.log(data.hits[1].recipe.ingredients);
//     } catch (err) {
//         console.error('Test failed:', err);
//     }
// };

// testFetchRecipes();

// Export the fetchRecipes function for use in other modules
export default fetchRecipes;
