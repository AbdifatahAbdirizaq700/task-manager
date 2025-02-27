const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ deleted: false }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add to existing routes
router.post("/", async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    category: req.body.category,
    assignee: req.body.assignee,
    tags: req.body.tags,
    status: 'pending'
  });
  
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Update task
router.patch("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        dueDate: req.body.dueDate
      },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Soft delete task
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get deleted tasks
router.get("/deleted", async (req, res) => {
  try {
    const tasks = await Task.find({ deleted: true }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

// Add this new route for restoring tasks
router.post("/:id/restore", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.deleted = false;
    task.deletedAt = null;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add this new route for restoring tasks
router.post("/:id/restore", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.deleted = false;
    task.deletedAt = null;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
