import { useState } from "react";
import { API } from "../api";

export default function TaskList({ tasks, fetchTasks }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // ✅ Toggle Status
  const toggleStatus = async (task) => {
    if (editId === task.id) return; // prevent toggle while editing

    await API.put(`/tasks/status/${task.id}`);
    fetchTasks();
  };

  // ✅ Delete Task
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // ✅ Start Edit
  const startEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
  };

  // ✅ Update Title
  const updateTask = async (id) => {
    if (!editTitle.trim()) return;

    await API.put(`/tasks/title/${id}`, {
      title: editTitle,
    });

    setEditId(null);
    setEditTitle("");
    fetchTasks();
  };

  // ✅ Cancel Edit
  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
  };

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No tasks available
      </p>
    );
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm">

        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left">Task</th>
            <th className="py-3 px-4 text-center">Status</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {tasks.map((task, index) => (
            <tr key={task.id} className="border-b hover:bg-gray-50">

              {/* INDEX */}
              <td className="py-3 px-4">{index + 1}</td>

              {/* TASK TITLE */}
              <td className="py-3 px-4">
                {editId === task.id ? (
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border px-3 py-1.5 rounded w-full focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                ) : (
                  <span
                    onClick={() => toggleStatus(task)}
                    className={`cursor-pointer font-medium ${
                      task.is_completed
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    {task.title}
                  </span>
                )}
              </td>

              {/* STATUS */}
              <td className="py-3 px-4 text-center">
                <span
                  onClick={() => toggleStatus(task)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer transition
                  ${
                    task.is_completed
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {task.is_completed ? "Completed" : "Pending"}
                </span>
              </td>

              {/* ACTIONS */}
              <td className="py-3 px-4 text-center space-x-2">

                {editId === task.id ? (
                  <>
                    <button
                      onClick={() => updateTask(task.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>

                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(task)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}

              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}