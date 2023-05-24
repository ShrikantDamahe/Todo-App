import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, handleTaskUpdate, handleTaskDelete }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          handleTaskUpdate={handleTaskUpdate}
          handleTaskDelete={handleTaskDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
