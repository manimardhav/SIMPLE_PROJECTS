document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('clearCompletedBtn').addEventListener('click', clearCompletedTasks);
document.getElementById('filterTasks').addEventListener('change', filterTasks);
document.getElementById('toggleThemeBtn').addEventListener('click', toggleTheme);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskPriority = document.getElementById('taskPriority');
    const taskDueDate = document.getElementById('taskDueDate');
    const taskText = taskInput.value.trim();
    const priority = taskPriority.value;
    const dueDate = taskDueDate.value;

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = priority; // Set class based on priority
    li.textContent = taskText + (dueDate ? ` (Due: ${new Date(dueDate).toLocaleDateString()})` : '');

    // Create Complete Button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.className = 'edit-btn';
    completeBtn.onclick = function() {
        li.classList.toggle('completed');
        filterTasks(); // Update filter after completing a task
    };

    // Create Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = function() {
        const newTaskText = prompt('Edit your task:', taskText);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            li.textContent = newTaskText + (dueDate ? ` (Due: ${new Date(dueDate).toLocaleDateString()})` : '');
            li.className = priority; // Reset class to priority
            li.appendChild(completeBtn);
            li.appendChild(editBtn);
            li.appendChild(deleteBtn);
        }
    };

    // Create Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        taskList.removeChild(li);
    };

    // Append buttons to the list item
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Clear input fields
    taskInput.value = '';
    taskPriority.value = 'normal'; // Reset priority to default
    taskDueDate.value = ''; // Reset due date
}

function clearCompletedTasks() {
    const taskList = document.getElementById('taskList');
    const completedTasks = taskList.querySelectorAll('li.completed');
    completedTasks.forEach(task => taskList.removeChild(task));
}

function filterTasks() {
    const filterValue = document.getElementById('filterTasks').value;
    const tasks = document.querySelectorAll('#taskList li');

    tasks.forEach(task => {
        switch (filterValue) {
            case 'active':
                task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
                break;
            case 'completed':
                task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                break;
            default:
                task.style.display = 'flex'; // Show all tasks
                break;
        }
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const container = document.querySelector('.container');
    container.classList.toggle('dark-mode');
}