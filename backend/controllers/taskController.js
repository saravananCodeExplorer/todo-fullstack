const db = require("../config/db");


//  GET ALL TASKS
exports.getTasks = (req, res) => {
  db.query("SELECT * FROM tasks ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// add task controler
exports.addTask = (req, res) => {
  const { title, due_date, status } = req.body;

  if (!title) return res.status(400).send("Task cannot be empty");

  db.query(
    "INSERT INTO tasks (title, due_date, status) VALUES (?, ?, ?)",
    [title, due_date, status],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Task added");
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
// update task status
exports.updateStatus = (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!status) {
    return res.status(400).json({ message: "Status is required" });
  }

  db.query(
    "UPDATE tasks SET status = ? WHERE id = ?",
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Status updated" });
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

