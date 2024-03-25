// Import the Task class from the specified file
import { Task } from "./Task.js";

// Define the Todos class
class Todos {
    // Private field to store tasks and backend URL
    #tasks = [];
    #backend_url = ''

    // Constructor to initialize the Todos instance with the backend URL
    constructor(url) {
        // Set the backend URL
        this.#backend_url = url;
    }

    // Method to fetch tasks from the backend
getTasks = () => {
    // Return a promise for asynchronous operation
    return new Promise(async (resolve, reject) => {
        // Fetch tasks from the backend
        fetch(this.#backend_url)

        .then((response) => 
            response.json() // Convert response to JSON
        ) 

        .then((json) => {
            // Process JSON data
            this.#readJson(json);
            // Resolve the promise with tasks
            resolve(this.#tasks);
        })
        .catch((error) => { 
            // Reject the promise with error if fetching fails
            reject(error);
        });
    });
};

// Private method to process JSON data and create Task objects
#readJson = (tasksAsJson) => {
    tasksAsJson.forEach((node) => {
        // Create a new Task object from JSON data
        const task = new Task(node.id, node.description);
        // Add the Task object to the tasks array
        this.#tasks.push(task);
    })
};







addTask = (taskContent) => {
    // Return a promise for asynchronous operation
    return new Promise((resolve, reject) => 
    {
        const json1 = JSON.stringify({ description: taskContent });
        // Fetch tasks from the backend
        fetch(this.#backend_url + '/new', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json1
        })

        .then(response => response.json()) // Convert response to JSON
        
        .then((json) => {
            // Resolve the promise with tasks
            resolve(this.#addToArray(json.id, taskContent));
        })

        .catch((error) => { // Corrected catch block
            // Reject the promise with error if fetching fails
            reject(error);
        });

    });
};


// Method to add a new task to the list of tasks
#addToArray = (id, text) => {
    // Create a new Task object with the provided ID and text
    const task1 = new Task(id, text);
    
    // Add the new task to the array of tasks
    this.#tasks.push(task1);
    
    // Return the newly added task
    return task1;
}







removeTask = (id) => {
    return new Promise(async (resolve, reject) => {
        fetch(this.#backend_url + '/delete/' + id, { // Corrected endpoint URL
            method: 'DELETE' // Corrected HTTP method
        })
            .then((response) => response.json())
            .then((json) => {
                this.#removeFromArray(id);
                resolve(json.id);
            })
            .catch((error) => { // Corrected catch block
                reject(error);
            });
    });
};

    


 // Method to remove a task from the list of tasks
#removeFromArray = (id) => {
    // Filter out the task with the provided ID from the array of tasks
    const arrayWithoutRemoved = this.#tasks.filter(task => task.id !== id);
    
    // Update the tasks array to exclude the removed task
    this.#tasks = arrayWithoutRemoved;
}
}







// Export the Todos class for use in other modules
export { Todos };