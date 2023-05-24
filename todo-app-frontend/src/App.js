import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.log(error));
  }, []);

  const handleTaskAdd = (title) => {
    const newTask = {
      title,
      completed: false,
    };

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then(response => response.json())
      .then(data => setTasks([...tasks, data]))
      .catch(error => console.log(error));
  };

  const handleTaskUpdate = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: updatedTasks.find(task => task.id === id).completed }),
    })
      .then(response => {
        if (response.ok) {
          setTasks(updatedTasks);
        }
      })
      .catch(error => console.log(error));
  };

  const handleTaskDelete = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          const updatedTasks = tasks.filter(task => task.id !== id);
          setTasks(updatedTasks);
        }
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TaskList
        tasks={tasks}
        handleTaskUpdate={handleTaskUpdate}
        handleTaskDelete={handleTaskDelete}
      />
      <form onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.taskTitle.value;
        if (title.trim() !== '') {
          handleTaskAdd(title);
          e.target.taskTitle.value = '';
        }
      }}>
        <input type="text" name="taskTitle" placeholder="Add a task" />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default App;
