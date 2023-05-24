import React from 'react';

const Task = ({ task, handleTaskUpdate, handleTaskDelete }) => {
  const { id, title, completed } = task;

  return (
    <div className={`task ${completed ? 'completed' : ''}`}>
      
      <button
  className={`task-status ${task.completed ? "completed" : ""}`}
  onClick={() => handleTaskUpdate(task.id)}
>
  {task.completed ? "Completed" : "Incomplete"}
</button>
      
      <span>{title}</span>
      <button onClick={() => handleTaskDelete(id)}>Delete</button>
    </div>
  );
};

export default Task;
