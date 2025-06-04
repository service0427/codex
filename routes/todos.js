const express = require('express');
const router = express.Router();

let todos = [];
let idCounter = 1;

router.get('/', (req, res) => {
  res.json(todos);
});

router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const todo = { id: idCounter++, title };
  todos.push(todo);
  res.status(201).json(todo);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Not found' });
  }
  const [removed] = todos.splice(index, 1);
  res.json(removed);
});

module.exports = router;
