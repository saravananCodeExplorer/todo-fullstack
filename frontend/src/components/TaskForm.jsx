import { useState } from "react";
import { API } from "../api";

export default function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Todo");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      await API.post("/tasks", {
        title,
        due_date: dueDate,
        status,
      });

      setTitle("");
      setDueDate("");
      setStatus("Todo");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">

      {/* Task Title */}
      <input
        type="text"
        placeholder="Enter task..."
        className="border p-2 rounded w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Due Date */}
      <input
        type="date"
        className="border p-2 rounded"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      {/* Status Dropdown */}
      <select
        className="border p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Validation">Validation</option>
        <option value="Done">Done</option>
        <option value="Rework">Rework</option>
      </select>

      {/* Button */}
      <button className="bg-indigo-600 text-white px-4 rounded">
        Add
      </button>

    </form>
  );
}