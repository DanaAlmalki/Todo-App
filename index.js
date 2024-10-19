// Initialize elements
const addTask = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
let inputTask = document.getElementById("input-task");
let inputDesc = document.getElementById("input-desc");

let todoArray = [];
const storedTodo = localStorage.getItem("todoArray");

if (storedTodo) {
  todoArray = JSON.parse(storedTodo);
}

// Function to add task elements to the DOM
function addTaskToDOM(taskObj, taskIndex) {
  let task = document.createElement("div");
  task.classList.add("task-container");

  let taskHeader = document.createElement("div");
  taskHeader.classList.add("task");

  let taskDesc = document.createElement("div");
  taskDesc.classList.add("taskDesc", "hidden");

  let li = document.createElement("li");
  li.innerText = taskObj.task;
  li.contentEditable = true;
  taskHeader.appendChild(li);

  let desc = document.createElement("p");
  desc.innerText = taskObj.desc;
  desc.contentEditable = true;
  taskDesc.appendChild(desc);

  // Check button
  let checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fa-solid fa-check fa"></i>';
  checkButton.classList.add("checkTask");
  taskHeader.appendChild(checkButton);

  // Apply 'checked' style if the task is marked as done
  if (taskObj.done) {
    checkButton.parentElement.style.textDecoration = "line-through";
    checkButton.classList.add("checked");
  }

  // Delete button
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("deleteTask");
  taskHeader.appendChild(deleteButton);

  // Show details button
  let showButton = document.createElement("button");
  showButton.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
  showButton.classList.add("showTask");
  taskHeader.appendChild(showButton);

  task.appendChild(taskHeader);
  task.appendChild(taskDesc);

  // Add task to the list
  taskList.appendChild(task);

  // Check button functionality
  checkButton.addEventListener("click", function () {
    todoArray[taskIndex].done = !todoArray[taskIndex].done;
    if (todoArray[taskIndex].done) {
      checkButton.parentElement.style.textDecoration = "line-through";
      checkButton.classList.add("checked");
    } else {
      checkButton.parentElement.style.textDecoration = "";
      checkButton.classList.remove("checked");
    }
    // Update local storage
    localStorage.setItem("todoArray", JSON.stringify(todoArray));
  });

  // Delete button functionality
  deleteButton.addEventListener("click", function () {
    task.remove(); // Remove task from DOM
    todoArray.splice(taskIndex, 1); // Remove task from array
    localStorage.setItem("todoArray", JSON.stringify(todoArray)); // Update localStorage
  });

  // Show/hide description functionality
  showButton.addEventListener("click", function () {
    if (taskDesc.classList.contains("hidden")) {
      taskDesc.classList.remove("hidden");
      showButton.innerHTML = '<i class="fa-solid fa-angle-up"></i>';
    } else {
      taskDesc.classList.add("hidden");
      showButton.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
    }
  });
}

// Load tasks from localStorage on page load
todoArray.forEach((taskObj, index) => {
  addTaskToDOM(taskObj, index);
});

// Add new task event listener
addTask.addEventListener("click", function () {
  if (inputTask.value === "") {
    alert("Please Enter a Task");
    return;
  }

  const todoItem = {
    task: inputTask.value,
    desc: inputDesc.value,
    done: false, // Initially set to false
  };

  // Add to array and localStorage
  todoArray.push(todoItem);
  localStorage.setItem("todoArray", JSON.stringify(todoArray));

  // Add to the DOM
  addTaskToDOM(todoItem, todoArray.length - 1);

  // Clear inputs
  inputTask.value = "";
  inputDesc.value = "";
});
