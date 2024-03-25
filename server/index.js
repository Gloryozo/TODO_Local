/*- Create PostgresSQL database with some content
- Create simple NodeJS app using JavaScript and Express
- Basic database programming using pg library
- Testing backend with REST Client*/

// Import necessary modules
require('dotenv').config(); // Load environment variables from .env file
console.log(process.env); // Print the value of DB_USER environment variable    
const express = require('express'); // Import the express module
const cors = require('cors'); // Import the cors module
//const { Pool } = require('pg'); // Import the Pool class from pg module
const { todoRouter} = require('./routes/todo.js'); // Import the query function from the db module

// Create an instance of express
const app = express();


// Enable CORS
app.use(cors());
// Allows reading posted values from the client as JSON.
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', todoRouter);

const port = process.env.PORT || 3001 // Define the port number

// Start listening on the defined port
app.listen(port);













