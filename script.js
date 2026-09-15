/* ============================================
   1. L'etat : le tableau des taches
   ============================================ */
let todos = [];
let nextId = 1;

/* ============================================
   2. Les elements du DOM
   ============================================ */
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");
const errorMsg = document.getElementById("error-msg");
const emptyMsg = document.getElementById("empty-msg");

/* ============================================
   3. Ajouter une tache
   ============================================ */
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    errorMsg.textContent = "Ecris une tache avant d'ajouter.";
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
  render();
});

/* ============================================
   4. Afficher la liste (render)
   ============================================ */
function render() {
  list.innerHTML = "";

  todos.forEach(function (todo) {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.done ? " is-done" : "");

    const checkBtn = document.createElement("button");
    checkBtn.className = "todo-item-check";
    checkBtn.setAttribute("aria-label", "Marquer comme terminee");
    checkBtn.textContent = todo.done ? "\u2713" : "";
    checkBtn.addEventListener("click", function () {
      toggleTodo(todo.id);
    });

    const span = document.createElement("span");
    span.className = "todo-item-text";
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "todo-item-delete";
    deleteBtn.setAttribute("aria-label", "Supprimer la tache");
    deleteBtn.textContent = "\u2715";
    deleteBtn.addEventListener("click", function () {
      deleteTodo(todo.id);
    });

    li.appendChild(checkBtn);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  updateCounter();
  updateEmptyState();
}

/* ============================================
   5. Cocher / decocher une tache
   ============================================ */
function toggleTodo(id) {
  const todo = todos.find(function (t) {
    return t.id === id;
  });
  todo.done = !todo.done;
  render();
}

/* ============================================
   6. Supprimer une tache
   ============================================ */
function deleteTodo(id) {
  todos = todos.filter(function (t) {
    return t.id !== id;
  });
  render();
}

/* ============================================
   7. Compteur "x sur y terminees"
   ============================================ */
function updateCounter() {
  const doneCount = todos.filter(function (t) {
    return t.done;
  }).length;

  counter.textContent = `${doneCount} sur ${todos.length} terminees`;
}

/* ============================================
   8. Message "aucune tache"
   ============================================ */
function updateEmptyState() {
  if (todos.length === 0) {
    emptyMsg.classList.remove("is-hidden");
    list.classList.add("is-hidden");
  } else {
    emptyMsg.classList.add("is-hidden");
    list.classList.remove("is-hidden");
  }
}

/* ============================================
   9. Demarrage
   ============================================ */
render();