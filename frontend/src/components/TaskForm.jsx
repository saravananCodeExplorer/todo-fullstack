import { useState } from "react";
import { API } from "../api";

export default function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    await API.post("/tasks", { title });

    setTitle("");
    fetchTasks();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-4"
    >
      <input
        type="text"
        placeholder="Enter task..."
        className="border p-2 rounded w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className="bg-indigo-600 text-white px-4 rounded">
        Add
      </button>
    </form>
  );
}