const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const DATA_FILE = path.join(__dirname, '..', 'data', 'todos.json');

let todos = [];
let idCounter = 1;

function loadTodos() {
  try {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    todos = data.todos || [];
    idCounter = data.idCounter || 1;
  } catch (err) {
    todos = [];
    idCounter = 1;
  }
}

function saveTodos() {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify({ todos, idCounter }, null, 2));
}

loadTodos();

router.get('/', (req, res) => {
  const { completed } = req.query;
  let result = todos;
  if (completed === 'true') {
    result = todos.filter(t => t.completed);
  } else if (completed === 'false') {
    result = todos.filter(t => !t.completed);
  }
  res.json(result);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(todo);
});

router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const todo = { id: idCounter++, title, completed: false };
  todos.push(todo);
  saveTodos();
  res.status(201).json(todo);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: 'Not found' });
  }
  const { title, completed } = req.body;
  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = Boolean(completed);
  saveTodos();
  res.json(todo);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Not found' });
  }
  const [removed] = todos.splice(index, 1);
  saveTodos();
  res.json(removed);
});

module.exports = router;
