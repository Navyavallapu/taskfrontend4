import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Load tasks from localStorage when app starts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  // Add new task
  const handleAddTask = () => {
    if (title.trim() === "") return;
    const newTask = { title, completed: false };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
    setTitle("");
  };

  // Toggle task completion
  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  // Delete task
  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    localStorage.setItem("tasks", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 Task Tracker</h1>

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
          {tasks.map((task, index) => (
            <li key={index} className="flex items-center justify-between px-4 py-2 border-b">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                  className="mr-2"
                />
                <span className={task.completed ? "line-through text-gray-400" : ""}>
                  {task.title}
                </span>
              </div>
              <button
                onClick={() => deleteTask(index)}
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
