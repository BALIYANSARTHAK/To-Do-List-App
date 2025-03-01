// Get elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event
addTaskButton.addEventListener('click', addTask);

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskItem = document.createElement('li');

    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.onclick = function() {
        taskItem.classList.toggle('completed', checkbox.checked);
        saveTasks();
    };

    taskItem.appendChild(checkbox);
    taskItem.appendChild(document.createTextNode(taskText));

    // Create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = function() {
        editTask(taskItem);
    };

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteTask(taskItem);
    };

    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
    taskInput.value = '';

    saveTasks();
}

// Function to edit a task
function editTask(taskItem) {
    const newTaskText = prompt('Edit your task:', taskItem.childNodes[1].textContent);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        taskItem.childNodes[1].textContent = newTaskText.trim();
        saveTasks();
    }
}

// Function to delete a task
function deleteTask(taskItem) {
    taskList.removeChild(taskItem);
    saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    const taskItems = taskList.getElementsByTagName('li');
    for (let i = 0; i < taskItems.length; i++) {
        const taskText = taskItems[i].childNodes[1].textContent;
        const isCompleted = taskItems[i].classList.contains('completed');
        tasks.push({ text: taskText, completed: isCompleted });
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement('li');

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = function() {
            taskItem.classList.toggle('completed', checkbox.checked);
            saveTasks();
        };

        taskItem.appendChild(checkbox);
        taskItem.appendChild(document.createTextNode(task.text));

        // Create edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
            editTask(taskItem);
        };

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            deleteTask(taskItem);
        };

        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        // Set the completed class based on the checkbox state
        if (task.completed) {
            taskItem.classList.add('completed');
        }
    });
}