const TaskItem = ({ task, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-2 border rounded mb-2">
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}
      >
        {task.title}
      </span>
      <button onClick={() => onDelete(task.id)} className="text-red-500">Delete</button>
    </div>
  );
};

export default TaskItem;
