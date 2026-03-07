async function loadTodos() {
  const res = await fetch('/api/todos');
  const todos = await res.json();
  renderTodos(todos);
}

function renderTodos(todos) {
  const list = document.getElementById('todoList');
  list.innerHTML = todos.map(todo => `
    <li class="todo-item ${todo.completed ? 'completed' : ''}">
      <span class="todo-text" onclick="toggleTodo(${todo.id})">${todo.text}</span>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
    </li>
  `).join('');
}

async function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  if (!text) return;
  
  await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  
  input.value = '';
  loadTodos();
}

async function toggleTodo(id) {
  await fetch(`/api/todos/${id}`, { method: 'PUT' });
  loadTodos();
}

async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, { method: 'DELETE' });
  loadTodos();
}

document.getElementById('todoInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

loadTodos();
