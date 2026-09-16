let todos = [];
let nextId = 1;

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");
const errorMsg = document.getElementById("error-msg");
const emptyMsg = document.getElementById("empty-msg");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    errorMsg.textContent = "Ecris une tache avant d'ajouter.";
    input.focus();
    return;
  }

  errorMsg.textContent = "";
  todos.push({
    id: nextId,
    text: text,
    done: false
  });
  nextId++;

  input.value = "";
  input.focus();
  render();
});

function render() {
  list.innerHTML = "";

  todos.forEach(function (todo) {
    const item = document.createElement("li");
    item.className = "todo-item" + (todo.done ? " is-done" : "");

    const text = document.createElement("span");
    text.className = "todo-item-text";
    text.textContent = todo.text;

    const actions = document.createElement("div");
    actions.className = "todo-item-actions";

    const doneButton = document.createElement("button");
    doneButton.type = "button";
    doneButton.className = "todo-item-done";
    doneButton.textContent = todo.done ? "Undo" : "Done";
    doneButton.setAttribute(
      "aria-label",
      todo.done ? "Marquer la tache comme non terminee" : "Marquer la tache comme terminee"
    );
    doneButton.addEventListener("click", function () {
      toggleTodo(todo.id);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "todo-item-delete";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", "Supprimer la tache");
    deleteButton.addEventListener("click", function () {
      deleteTodo(todo.id);
    });

    actions.appendChild(doneButton);
    actions.appendChild(deleteButton);
    item.appendChild(text);
    item.appendChild(actions);
    list.appendChild(item);
  });

  updateCounter();
  updateEmptyState();
}

function toggleTodo(id) {
  const todo = todos.find(function (item) {
    return item.id === id;
  });

  if (todo) {
    todo.done = !todo.done;
    render();
  }
}

function deleteTodo(id) {
  todos = todos.filter(function (todo) {
    return todo.id !== id;
  });
  render();
}

function updateCounter() {
  const doneCount = todos.filter(function (todo) {
    return todo.done;
  }).length;

  counter.textContent = `${doneCount} sur ${todos.length} terminees`;
}

function updateEmptyState() {
  const hasTodos = todos.length > 0;
  emptyMsg.classList.toggle("is-hidden", hasTodos);
  list.classList.toggle("is-hidden", !hasTodos);
}

render();
