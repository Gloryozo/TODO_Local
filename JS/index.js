// this is to define the root URL for backend API
const BACKEND_ROOT_URL = 'http://localhost:3001'
// Import the Todos class from the specified file
import { Todos } from "./class/Todos.js"
//Create a new instance of the Todos class with the backend root URL
const todos = new Todos(BACKEND_ROOT_URL)

// to Select the <ul> element from the DOM
const list = document.querySelector('ul')

// to Select the <input> element from the DOM
const input = document.querySelector('input')

// To disable the input element 
input.disabled = true;







/*- Making HTTP calls from the front-end using JavaScript
- Get data from back-end
- Post data to back-end
- Error handling when making HTTP calls*/

// Function to render a task item
const renderTask = (addingTask) => 
{
    // Create a new <li> element
    const li = document.createElement("li");
    
    // Set class attribute for the <li> element
    li.setAttribute('class','list-group-item');
    li.setAttribute('data-key', addingTask.getId().toString());
    
    // Render text content of the task
    renderSpan(li, addingTask.getText());
    
    // Render delete link for the task
    renderLink(li, addingTask.getId());
    
    // Append the <li> element to the <ul> list
    list.appendChild(li);
};


// Function to render the text content of a task within a <span> element
const renderSpan = (li, text) => {
    // Create a <span> element
    const span = document.createElement('span');
    
    // Set the innerHTML of the <span> element to the text content of the task
    span.textContent = text;
    li.appendChild(span);
};







// Function to fetch tasks from the backend
const getTasks = () => 
{
    todos.getTasks()
    .then((tasks)=> {
     // Iterate over each task in the JSON response
        tasks.forEach(task1 => {
            // Render each task
            renderTask(task1)
        })   ;
        // Once all tasks have been rendered, re-enable the input field.
        // This is done by setting its 'disabled' property to false, allowing the user to enter new tasks.
        input.disabled = false;
    }).catch((error) => {
        // Display an error if fetching tasks fails
        alert(error)
    })
};

getTasks();




 
// Function to render a link for deleting a task
const renderLink = (li,id) => {
    const a = li.appendChild(document.createElement('a'))
    a.innerHTML = '<i class="bi bi-trash"></i>';
    a.setAttribute('style','float: right')
    a.setAttribute('href', '#');                // Set the href attribute to '#' to make the anchor element clickable
    a.setAttribute('data-id', id);              // Store the task's ID in a 'data-id' attribute for access during the delete operation
    a.addEventListener('click',(event)=> {
        todos.removeTask(id).then((removed_id) => {
            const li_to_remove = document.querySelector(`[data-key='${removed_id}']`);
            if (li_to_remove) {
                list.removeChild(li_to_remove);
            }
    }).catch((error)=> {
        alert(error)
        })
    })

    // ****** DELETE BUTTON EVENT LISTNER: Add a click event listener to the anchor element **********
  a.addEventListener('click', function(event) 
  {
      event.preventDefault(); // Prevent the link from changing the URL

      todos.removeTask(id)    //Run the Back End Task Removal Function
      .then(() =>     //If the Task delete success Remove the whole Task List Item
      {
          li.remove(); // Remove the list item from the DOM
      })
      
      .catch((error) =>   //If the Task delete fails
      {
          alert(error); // Alert the error if something goes wrong
      });
  });
     li.appendChild(a); 
    // ****** APPEND THE ANCHOR ELEMENT TO THE LIST ITEM **********
 // Append the anchor element to the list item 
 // End of renderLink function
}
 
  



// Event listener for keypress event on the input element
input.addEventListener('keypress', (event) => {   
    // Check if the pressed key is 'Enter'
    if (event.key === 'Enter') {
        // Prevent the default behavior of the 'Enter' key
        event.preventDefault()
        
        // Get the trimmed value of the input
        const task = input.value.trim()
        
        // Check if the input value is not empty
        if (task !== '') 
        {
            todos.addTask(task)
            .then((task)=> 
            {
            // Call renderTask function to render the task
            renderTask(task)
            // Clear the input value
            input.value = ''

            input.focus()
            })
        
        }
    }
})
// Call getTasks function to fetch tasks from the backend







