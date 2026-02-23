const db = require("../config/db");


// 📌 GET ALL TASKS
exports.getTasks = (req, res) => {
  db.query("SELECT * FROM tasks ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};


//  ADD TASK
exports.addTask = (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Task cannot be empty" });
  }

  db.query(
    "INSERT INTO tasks (title) VALUES (?)",
    [title],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task added", id: result.insertId });
    }
  );
};


// UPDATE STATUS (Complete / Pending)
exports.updateStatus = (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE tasks SET is_completed = NOT is_completed WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Status updated" });
    }
  );
};


//  UPDATE TASK TITLE 
exports.updateTitle = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Title is required" });
  }

  db.query(
    "UPDATE tasks SET title = ? WHERE id = ?",
    [title, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task title updated" });
    }
  );
};


//  DELETE TASK
exports.deleteTask = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Task deleted" });
  });
};