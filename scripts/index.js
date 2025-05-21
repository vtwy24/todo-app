const form = document.querySelector('form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasksArr = getTask();
updateTaskList();

form.addEventListener('submit', function (e) {
  e.preventDefault();
  addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText.length > 0) {
    const taskObj = {
      text: taskText,
      done: false,
    };
    tasksArr.push(taskObj);
    updateTaskList();
    storeTask();
    taskInput.value = '';
  } else {
    alert('No Task Submitted');
  }
}

function updateTaskList() {
  taskList.innerHTML = '';
  tasksArr.forEach((task, taskIndex) => {
    const taskItem = createTask(task, taskIndex);
    taskList.append(taskItem);
  });
}

function createTask(task, taskIndex) {
  const taskId = `task-${taskIndex}`;
  const taskLI = document.createElement('li');
  const taskText = task.text;

  taskLI.className = 'task';
  taskLI.innerHTML = `
  <input type="checkbox" id="${taskId}">
        <label class="custom-checkbox" for="${taskId}">
          <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            transform="rotate(0)">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="transparent" stroke-width="2.5"
                stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
        </label>
        <label class="task-text" for="${taskId}">
          ${taskText}
        </label>
        <button class="delete-button">
          <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            stroke="var(--secondary-color)">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M10 12V17" stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
              </path>
              <path d="M14 12V17" stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round">
              </path>
              <path d="M4 7H20" stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round"></path>
              <path d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                stroke="var(--secondary-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg>
        </button>
  `;

  taskLI.querySelector('.delete-button').addEventListener('click', () => {
    tasksArr.splice(taskIndex, 1);
    storeTask();
    updateTaskList();
  });

  const checkbox = taskLI.querySelector('input');
  checkbox.addEventListener('change', () => {
    tasksArr[taskIndex].done = checkbox.checked;
    storeTask();
  });

  return taskLI;
}

function storeTask() {
  localStorage.setItem('tasks', JSON.stringify(tasksArr));
}

function getTask() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}
