# Diet Delight

A full-stack web application by John Fuentes, Hy Nguyen and Branden Chiem.

A capstone project for the Diploma of IT at Coder Academy.

## R10: Deployed App and API

- App: https://diet-delight.netlify.app/  
- API: https://diet-delight-backend.onrender.com/

## R11: Github Repository

- Frontend: https://github.com/jmcaluyafuentes/diet-delight-frontend  
- Backend: https://github.com/jmcaluyafuentes/diet-delight-backend

## Installation and Set Up Instructions

Follow these steps to set up the project locally.

### 1. Prerequisites

Make sure you have the following installed:

- Node.js  
- npm (Node Package Manager)

### 2. Clone the Repository

Clone the repository to your local machine:

```
git clone https://github.com/jmcaluyafuentes/diet-delight-backend.git
```

Navigate to the project directory:

```
cd diet-delight-backend
```

### 3. Install Dependencies

```
npm install
```

### 4. Environment Variables

Create a `.env` file in the root of the project and add the necessary environment variables. You can refer to the `.env.example` file provided in the repository for the required variables.

- `DB_URI`: The connection string for MongoDB database.  
- `APP_ID`: Your Application ID from Edamam Recipe Search API  
- `APP_KEY`: Your Application Key from Edamam Recipe Search API

### How to Obtain `APP_ID` and `APP_KEY`

1. Visit the [Edamam website](https://www.edamam.com/)
2. Click on Signup API
3. Fill up the signup form.
  - Organization name: Can be any name (e.g., your school or organization)  
  - Choose your plan: Select `Developer` under `Recipe Search API`

4. After signing up, click Log in
5. Click `Go to Dashboard`
5. Navigate to the Application tab and click `View` to find your `Application ID (APP_ID)` and `Application Keys (APP_KEY)`.  
  Note: Do not include the trailing `(space and dash) —` in the APP_KEY.

### 5. Running the Application

To start the development server, run:

```
npm start
```

This will start the application on http://localhost:4001/

### 6. Running Tests

```
npm test
```

## R1: Website Desciption

### Description

Diet Delight is a modern web application designed to enhance the services of Fit Life Gym by offering personalised meal planning and healthy eating guidance. This app provides a seamless experience for users to discover, save and manage recipes that align with their fitness goals, whether they aim to build muscle, lose weight or improve endurance.

### Purpose

The purpose of Diet Delight is to deliver added value to Fit Life Gym members by integrating meal planning with fitness routines. The app helps users search for recipes based on dietary categories that support specific fitness goals. Users can print selected recipes in PDF format for convenient grocery shopping and meal preparation. Users can also save and manage favorite recipes to ensure easy access and organisation of dietary options.

### Functionality and Features

1. Search Recipes (MVP 1) - The app allows users to search for recipes by selecting dietary categories aligned with their fitness goals (e.g., high-protein for muscle gain, low-carb for weight loss).

2. Print Recipes (MVP 2) - The app enables users to select and print recipes in PDF format which provides a handy grocery list and meal planning guide.

3. Featured Recipes (MVP 3) - The app provides access to a curated list of recommended recipes that allows users to explore and choose appealing options.

4. User Management (Stretch 1) - Users can create their accounts. Registered users can log in, update their profiles and delete their accounts if needed.

5. Save Recipes (Stretch 2) - Registered users can save their favorite recipes for easy retrieval. They can also add or remove recipes from their saved list.

### Target Audience

- Fitness Enthusiasts - Individuals that seek diet plans that complement their workout routines.
- Gym Members - Fit Life Gym users who want to integrate healthy eating into their fitness regimen.
- Gym Instructors - Professionals who need a tool to recommend suitable recipes to clients.

### Tech Stack

### Frontend:

- HTML - Used for structuring the content and layout of web pages.
- React.js -  A JavaScript library for building interactive user interfaces.
- Vite - A build tool and development server for fast frontend development.
- Bulma - A CSS framework for styling the frontend.
- Netlify - The platform used for deploying the frontend.

### Backend:

- Node.js - A JavaScript runtime environment for server-side development.
- Express.js - A web application framework for building APIs.
- Mongoose - An ODM (Object Data Modeling) library for MongoDB, used to interact with the database.
- Render - The platform used for deploying the backend.

### Database:

- MongoDB Atlas - A cloud-based NoSQL database service used for storing user data and recipe information.

### API Integration:

- Edamam API - Provides access to a wide range of recipes and nutritional data.

### Authentication:

- JSON Web Tokens (JWT) - Used for secure user authentication.

### Testing:

- Vitest - A fast unit test framework for Vite.
- Testing Library - For testing React components.
- Jest - A JavaScript testing framework for backend testing.
- Supertest - For testing HTTP assertions in the backend.

### Version Control and Collaboration:

- Git - Version control system for tracking changes in the codebase.
- GitHub - Platform for repository management, collaboration and code reviews.

### Design and Project Management:

- Figma - For UI/UX design and prototyping.
- Trello - For project management, tracking tasks, and collaboration.

## R2: Dataflow Diagram

### Search and Print Recipes (MVP 1 and 2)

![Epic 1 and 2 dataflow](docs/Epic1&2.png)

### Featured Recipes (MVP 3)

![Epic 3 dataflow](docs/Epic3.png)

## R3: Application Architecture Diagram

![Application Architecture Diagram](./docs/architechture.png)

The frontend of the application renders the user interface and handles user interactions. Users can search for recipes, view detailed recipe information and select recipes to print or save. The frontend sends HTTP requests to the backend server to process user requests and retrieves the data.

The backend communicates with the Edamam API to fetch recipe data when users search for recipes. The API request includes parameters such as dietary categories and the response is processed by the backend before being sent to the front-end.

The backend temporarily saves recipe data retrieved from the third-party Edamam API in the database. This is particularly useful for featured recipes which are selected and stored in the database to be quickly accessed by users without repeatedly querying the external API. The database also manages CRUD operations for user accounts and saved recipes.

## R4: User Stories

### User Registration and Login

* As a new user, I want to be able to register for an account so that I can access the application's features.
* As an existing user, I want to be able to log in to my account securely so that I can access my personalized information.

### Dietary Category Search

* As a user, I want to be able to search for dietary categories (e.g., high-protein, low-carb) based on my fitness goals, so that I can find recipes and meal plans that align with my objectives.

* As a user, I want the search results to be personalized to my fitness goals and dietary preferences, so that I can easily find the most relevant information.

### Recipe Details

* As a user, I want to be able to view detailed information about each recipe, such as the nutrient composition and recommended portion sizes, so that I can make informed decisions about my dietary choices.

* As a user, I want the recipe details to be presented in a clear and easy-to-understand format, so that I can quickly grasp the key information.

### Meal Planning and Recipes

* As a user, I want to be able to save my favorite recipes, so that I can easily access them for future meal planning.

* As a user, I want to be able to create and save custom meal plans based on my dietary preferences and fitness goals, so that I can easily follow a personalized nutrition plan.

### Mobile Accessibility

* As a user, I want the application to be optimized for mobile devices, so that I can access the features and content on the go.

* As a user, I want the experience for mobile devices to be intuitive, so that I can easily navigate the application and find the information I need quickly.

## R5: Wireframes

### Homepage

![Home Page](docs/1_Home_Page.png)

### Dietary  Selection

![Dietary Selection](docs/2_Dietary_Selection.png)

### Recipe Preview

![Recipe Preview](docs/3_Previews_Page.png)

### Recipe Details

![Recipe Details](docs/4_Show_Recipe.png)

### Recipes PDF Preview (Print Page)

![Recipes PDF](docs/5._Print_Recipes.png)

## R6: Screenshots of Trello board

Our team used Trello to manage our tasks due to its good visual, straightforward and user-friendly components.

Link to our Trello board --> https://trello.com/b/K1DuOj8t/diet-delight-web-app

![Trello board](./docs/trelloboard.png)

### 14/08/2024 - Tasks planning stage

![ToDo1.png](./docs/ToDo1.png)  
![ToDo2.png](./docs/ToDo2.png)  
![ToDo3.png](./docs/ToDo3.png)  
![ToDo4.png](./docs/ToDo4.png)  
![ToDo5.png](./docs/ToDo5.png)  
![ToDo6.png](./docs/ToDo6.png)  
![ToDo7.png](./docs/ToDo7.png)  
![ToDo8.png](./docs/ToDo8.png)  
![ToDo9.png](./docs/ToDo9.png)

### Implementation Stage

### 19/8/24
![Trello board ](./docs/trello-19-8-24-min.png)

### 20/8/24
![Trello board ](./docs/trello-20-8-24-min.png)

### 21/8/24
![Trello board ](./docs/trello-21-8-24-min.png)

### 22/8/24
![Trello board ](./docs/trello-22-8-24-min.png)

### 23/8/24
![Trello board ](./docs/trello-23-8-24-min.png)

### 24/8/24
![Trello board ](./docs/trello-24-8-24-min.png)

### 25/8/24
![Trello board ](./docs/trello-25-8-24-min.png)

### API Endpoints

## `GET /recipes`

### Decription

Fetches recipes based on selected diet and health criteria from third-party Edamam API and returns a list of recipes.

### Query Parameters

diet (optional, array):  
A comma-separated list of diet criteria to filter recipes.  
Example values: high-protein, high-fiber

health (optional, array):  
A comma-separated list of health criteria to filter recipes.  
Example values: egg-free, fish-free

Example Request:  
`GET /recipes?diet=high-protein&health=egg-free`

Response:  
`200 OK` on successful retrieval.

`404 Not Found` if no recipes were found based on the provided criteria.
```json
{
  "error": "No recipes found"
}
```

`500 Internal Server Error` if an error occurred while processing the request.
```json
{
  "error": "Internal Server Error"
}
```

Response body:  
Please refer to https://diet-delight-backend.onrender.com/recipes?diet=high-protein&health=egg-free
