import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://taskbackend1-o5uc.onrender.com/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  // Fetch tasks from backend
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setTasks(res.data))
      .catch((err) => {
        console.error("GET error:", err);
        setError("Failed to fetch tasks.");
      });
  }, []);

  // Add a task
  const handleAddTask = async () => {
    if (title.trim() === "") return;
    try {
      const res = await axios.post(API_URL, { title });
      setTasks([res.data, ...tasks]);
      setTitle("");
      setError(null);
    } catch (err) {
      console.error("POST error:", err);
      setError("Failed to add task.");
    }
  };

  // Toggle task completion
  const handleToggleComplete = async (id) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`);
      setTasks(
        tasks.map((task) => (task.id === id ? res.data : task))
      );
    } catch (err) {
      console.error("PUT error:", err);
      setError("Failed to update task.");
    }
  };

  // Delete a task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("DELETE error:", err);
      setError("Failed to delete task.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 Task Tracker</h1>

        {error && <div className="text-red-600 text-center mb-4">{error}</div>}

        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none"
            placeholder="Enter task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>

        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="px-4 py-2 border-b flex items-center justify-between"
            >
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                />
                <span
                  className={`${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </span>
              </label>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
