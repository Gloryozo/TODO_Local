const express = require('express');
const {query} = require('../helpers/db.js');

const todoRouter = express.Router();

// Define endpoint to handle GET requests
todoRouter.get('/', async (req, res) => 
{
    try {
        // Execute the SQL query to select all tasks
        const result = await query('select * from task');
        // Send a JSON response with the retrieved tasks
        res.status(200).json(result.rows);
    } catch (error) {
        // Log any errors that occur during the execution of the SQL query
        console.log(error);
        // Send a JSON response with the error message and a 500 status code
        res.status(500).json({ error: error.message });
    }
});

// Define endpoint to handle POST requests
todoRouter.post('/new', async (req, res) => {
    try {
        // Execute the SQL query to insert a new task
        const result = await query('insert into task(description) values ($1) returning *', 
        [req.body.description]);
        
        // Send a JSON response with the ID of the newly inserted task
        res.status(200).json(result.rows[0]);
    } 
    catch (error) {
        // Log the error
        console.log(error);
        
        // Send a JSON response with the error message and a 500 status code
        res.status(500).json({ error: error.message });
    }
});

todoRouter.delete("/delete/:id", async (req, res) => {
    const id = Number(req.params.id); // Extract the task id from the request parameters
    try {
        // Execute the SQL query to delete a task with the specified id
        const result = await query('delete from task where id = $1', [id]);
        // Send a JSON response with the id of the deleted task
        res.status(200).json({ id: id });
    } catch (error) {   
        // Log any errors that occur during the execution of the SQL query
        console.log(error);
        // Set the response status message to the error message
        res.statusMessage = error.message;
        // Send a JSON response with the error message and a 500 status code
        res.status(500).json({ error: error.message });
    }
});



module.exports = { todoRouter }; // Export the query function and the todoRouter