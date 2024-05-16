function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const todoText = todoInput.value.trim();

  if (todoText === "") {
    alert("Please enter a todo item.");
    return;
  }

  const newTodo = document.createElement("li");
  newTodo.textContent = todoText;
  newTodo.draggable = true;
  newTodo.id = "todoItem" + new Date().getTime();
  newTodo.addEventListener("dragstart", drag);
  newTodo.addEventListener("click", moveToInProgress);

  document.getElementById("todoList").appendChild(newTodo);

  todoInput.value = "";
}

function moveToInProgress(event) {
  const listItem = event.target;
  document.getElementById("inProgressList").appendChild(listItem);
  listItem.removeEventListener("click", moveToInProgress);
  listItem.addEventListener("click", moveToCompleted);
}

function moveToCompleted(event) {
  const listItem = event.target;
  document.getElementById("completedList").appendChild(listItem);
  listItem.removeEventListener("click", moveToCompleted);
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text");
  const target = event.target;
  if (target.tagName === "UL") {
    target.appendChild(document.getElementById(data));
  } else if (target.tagName === "LI") {
    target.parentNode.insertBefore(
      document.getElementById(data),
      target.nextSibling
    );
  }
}
