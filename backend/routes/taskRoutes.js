const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
router.get("/tasks", taskController.getTasks);
router.post("/tasks", taskController.addTask);

router.put("/tasks/status/:id", taskController.updateStatus); // ✅ status only
router.put("/tasks/title/:id", taskController.updateTitle);   // ✅ title only

router.delete("/tasks/:id", taskController.deleteTask);

module.exports = router;