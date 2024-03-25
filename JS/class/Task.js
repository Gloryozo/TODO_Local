// Define a class representing a task
class Task
{
     // Private fields for task ID and text
    #id
    #text

     // Constructor to initialize task ID and text
    constructor(id, text) {
        this.#id = id;
        this.#text = text;
    }
    // Method to get the task ID
    getId() {
        return this.#id
    }
     // Method to get the task text
    getText(){
        return this.#text
    }
}
//Export the Task class for use in other modules
export { Task }