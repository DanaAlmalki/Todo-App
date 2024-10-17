const addTask = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
let inputTask = document.getElementById("input-task");
let inputDesc = document.getElementById("input-desc");

addTask.addEventListener("click", function () {
  let task = document.createElement("div");
  task.classList.add("task-container");

  let taskHeader = document.createElement("div");
  taskHeader.classList.add("task");

  let taskDesc = document.createElement("div");
  taskDesc.classList.add("task");
  taskDesc.classList.add("hidden");

  let li = document.createElement("li");
  li.innerText = `${inputTask.value}`;
  taskHeader.appendChild(li);

  let desc = document.createElement("p");
  desc.innerText = `${inputDesc.value}`;
  taskDesc.appendChild(desc);

  let checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  checkButton.classList.add("checkTask");
  taskHeader.appendChild(checkButton);

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("deleteTask");
  taskHeader.appendChild(deleteButton);

  let showButton = document.createElement("button");
  showButton.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
  showButton.classList.add("showTask");
  taskHeader.appendChild(showButton);

  task.appendChild(taskHeader);
  task.appendChild(taskDesc);

  if (inputTask.value == "") {
    alert("Please Enter a Task");
  } else {
    taskList.appendChild(task);
  }

  inputTask.value == "";
  inputDesc.value == "";

  checkButton.addEventListener("click", function () {
    checkButton.parentElement.style.textDecoration = "line-through";
  });

  deleteButton.addEventListener("click", function (e) {
    let button = e.target.closest("button"); // Find the closest <button> element
    if (button) {
      button.parentElement.parentElement.remove(); // Remove the parent element (the task)
    }
  });

  showButton.addEventListener("click", function () {
    let desc = showButton.parentElement.nextElementSibling;
    if (desc.classList.contains("hidden")) {
      desc.classList.remove("hidden");
      showButton.innerHTML = '<i class="fa-solid fa-angle-up"></i>';
    } else {
      desc.classList.add("hidden");
      showButton.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
    }
  });
});
