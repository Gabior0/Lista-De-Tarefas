const inputElement = document.querySelector(".new-task-input");
const addTaskButon = document.querySelector(".new-task-button");
const taskContainer = document.querySelector(".tasks-container");

const validadeImput = () => inputElement.value.trim().length > 0;

const handleAddTask = () => {
  const inputIsValid = validadeImput();

  if (!inputIsValid) {
    return inputElement.classList.add("error");
  }

  const taskItemContainer = document.createElement("div");
  taskItemContainer.classList.add("task-item");

  const taskContent = document.createElement("p");
  taskContent.innerText = inputElement.value;

  taskContent.addEventListener("click", () => handleClick(taskContent));

  const deleteItem = document.createElement("i");
  deleteItem.classList.add("far");
  deleteItem.classList.add("fa-trash-alt");
  deleteItem.classList.add("delete-task-item");

  deleteItem.addEventListener("click", () =>
    handleDeleteClick(taskItemContainer, taskContent)
  );

  taskItemContainer.appendChild(taskContent);
  taskItemContainer.appendChild(deleteItem);

  taskContainer.appendChild(taskItemContainer);

  inputElement.value = "";

  updateLocalStorage();
};

const handleClick = (taskContent) => {
  const tasks = taskContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingCliked = task.firstChild.isSameNode(taskContent);

    if (currentTaskIsBeingCliked) {
      task.firstChild.classList.toggle("completed");
    }
  }

  updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = taskContainer.childNodes;

  for (const task of tasks) {
    const currentTaskIsBeingCliked = task.firstChild.isSameNode(taskContent);
    if (currentTaskIsBeingCliked) {
      taskItemContainer.remove();
    }
  }

  updateLocalStorage();
};

const handleInputChange = () => {
  const inputIsValid = validadeImput();

  if (inputIsValid) {
    return inputElement.classList.remove("error");
  }
};

const updateLocalStorage = () => {
  const tasks = taskContainer.childNodes;

  const locaStorageTask = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.innerText, isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(locaStorageTask));
};

const refreshTasksUsingLocalStorage = () => {
  const tasksFromLocalStorage = JSON.parse(localStorage.getItem("tasks"));

  for (const task of tasksFromLocalStorage) {
    const taskItemContainer = document.createElement("div");
    taskItemContainer.classList.add("task-item");

    const taskContent = document.createElement("p");
    taskContent.innerText = task.description;

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    taskContent.addEventListener("click", () => handleClick(taskContent));

    const deleteItem = document.createElement("i");
    deleteItem.classList.add("far");
    deleteItem.classList.add("fa-trash-alt");
    deleteItem.classList.add("delete-task-item");

    deleteItem.addEventListener("click", () =>
      handleDeleteClick(taskItemContainer, taskContent)
    );

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);

    taskContainer.appendChild(taskItemContainer);
  }
};

refreshTasksUsingLocalStorage();

addTaskButon.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change", () => handleInputChange());
