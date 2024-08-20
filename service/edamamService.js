import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

const query = 'chicken'

const fetchRecipes = async () => {
    const url = `https://api.edamam.com/search?q=${query}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (err) {
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

export default fetchRecipes;
