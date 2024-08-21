import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

// hard-coded query parameter for backend development stage
const query = 'chicken'

const fetchRecipes = async () => {
    // Construct the URL for the Edamam API request
    const url = `https://api.edamam.com/search?q=${query}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}` 

    try {
        // Send a GET request to the Edamam API
        const response = await fetch(url);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse and return the JSON response from the API
        return await response.json();
    } catch (err) {
        // Log any errors that occur during the fetch process
        console.log('Error fetching data from Edamam API:', err);
    }
}

// Testing the function in the terminal:
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

export default fetchRecipes;
