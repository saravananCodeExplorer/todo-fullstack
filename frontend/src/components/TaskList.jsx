import { useState } from "react";
import { API } from "../api";

export default function TaskList({ tasks, fetchTasks }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  // STATUS OPTIONS
  const statusOptions = [
    "todo",
    "inprogress",
    "validation",
    "done",
    "rework",
  ];

  //  UPDATE STATUS
  const updateStatus = async (id, newStatus) => {
    await API.put(`/tasks/status/${id}`, { status: newStatus });
    fetchTasks();
  };

  //  FORMAT DATE
  const formatDueDate = (dueDate) => {
    if (!dueDate) return "No date";

    const date = new Date(dueDate);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // REMAINING TIME
  const getRemainingTime = (dueDate) => {
    if (!dueDate) return "";

    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;

    if (diff <= 0) return "Overdue";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    if (hours > 0) return `Due in ${hours}h ${minutes}m`;
    return `Due in ${minutes}m`;
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // START EDIT
  const startEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
  };

  // UPDATE TITLE
  const updateTask = async (id) => {
    if (!editTitle.trim()) return;

    await API.put(`/tasks/title/${id}`, {
      title: editTitle,
    });

    setEditId(null);
    setEditTitle("");
    fetchTasks();
  };

  // CANCEL EDIT
  const cancelEdit = () => {
    setEditId(null);
    setEditTitle("");
  };

  // STATUS COLOR
  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-600";
      case "inprogress":
        return "bg-blue-100 text-blue-600";
      case "validation":
        return "bg-purple-100 text-purple-600";
      case "done":
        return "bg-green-100 text-green-600";
      case "rework":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
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

        {/* HEADER */}
        <thead className="bg-indigo-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">#</th>
            <th className="py-3 px-4 text-left">Task</th>
            <th className="py-3 px-4 text-center">Due Date</th>
            <th className="py-3 px-4 text-center">Status</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
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
                  <span className="font-medium">
                    {task.title}
                  </span>
                )}
              </td>

              {/* DUE DATE */}
              <td className="py-3 px-4 text-center">
                <div className="flex flex-col items-center">
                  <span className="font-medium text-gray-700">
                    {formatDueDate(task.due_date)}
                  </span>

                  <span
                    className={`text-xs mt-1 ${
                      getRemainingTime(task.due_date) === "Overdue"
                        ? "text-red-500"
                        : "text-indigo-500"
                    }`}
                  >
                    {getRemainingTime(task.due_date)}
                  </span>
                </div>
              </td>

              {/* STATUS DROPDOWN */}
              <td className="py-3 px-4 text-center">
                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task.id, e.target.value)
                  }
                  className={`px-3 py-1 rounded-full text-sm font-semibold border outline-none ${getStatusColor(
                    task.status
                  )}`}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
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