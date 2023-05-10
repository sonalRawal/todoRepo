const express = require('express');
const router = express.Router();
const db = require('../models');

router.post('/todo', async (req, res) => {
  try {
    const { title, description } = req.body;
    const todo = await db.Todo.create({ title, description });
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/todo/:todoId', async (req, res) => {
  try {
    const { title, description } = req.body;
    const { todoId } = req.params;
    const todo = await db.Todo.findByPk(todoId);
    if (todo) {
      todo.title = title;
      todo.description = description;
      await todo.save();
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: `Todo with id ${todoId} not found.` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/todo', async (req, res) => {
  try {
    const todos = await db.Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/todo/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await db.Todo.findByPk(todoId);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ message: `Todo with id ${todoId} not found.` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/todo/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;
    const todo = await db.Todo.findByPk(todoId);
    if (todo) {
      await todo.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ message: `Todo with id ${todoId} not found.` });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;