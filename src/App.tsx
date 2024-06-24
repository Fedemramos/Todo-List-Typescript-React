import React, { useState, useEffect } from 'react';
import ToDoList from './components/ToDoList';
import './App.css';

interface Task {
  id: number;
  text: string;
  description?: string;
  category: string;
  completed: boolean;
}

const MAX_CHARACTERS_TASK = 30;
const MAX_CHARACTERS_DESCRIPTION = 100;

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: 'Finalize presentation', description: 'Work presentation for client', category: 'Work', completed: true },
    { id: 2, text: 'Book flights to Seattle', description: 'Flight for business trip', category: 'Travel', completed: true },
    { id: 3, text: 'Finish design for new website', description: 'Website design for client', category: 'Work', completed: false },
    { id: 4, text: 'Get flowers for nana', description: 'Buy flowers for birthday', category: 'Family', completed: false },
  ]);

  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [activeButton, setActiveButton] = useState<'all' | 'completed' | 'pending'>('all');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    const restOfDate = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    setCurrentDate(`<strong style="font-size: 1.5em;">${dayOfWeek}</strong><br /><span>${restOfDate}</span>`);
  }, []);

  const toggleComplete = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTaskText.trim()) {
      if (newTaskText.length > MAX_CHARACTERS_TASK) {
        alert(`El título de la tarea no puede tener más de ${MAX_CHARACTERS_TASK} caracteres.`);
        return;
      }
      if (newTaskDescription.length > MAX_CHARACTERS_DESCRIPTION) {
        alert(`La descripción de la tarea no puede tener más de ${MAX_CHARACTERS_DESCRIPTION} caracteres.`);
        return;
      }

      const newTask: Task = {
        id: tasks.length + 1,
        text: newTaskText,
        description: newTaskDescription,
        category: 'General',
        completed: false,
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
      setNewTaskDescription('');
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const deleteCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const handleFilterChange = (filter: 'all' | 'completed' | 'pending') => {
    setActiveButton(filter);
  };

  const filteredTasks = tasks.filter(task => {
    if (activeButton === 'completed') {
      return task.completed;
    } else if (activeButton === 'pending') {
      return !task.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="app">
      <div className="header">
        <div className="date-info" dangerouslySetInnerHTML={{ __html: currentDate }} />
      </div>
      <ToDoList 
        tasks={filteredTasks} 
        toggleComplete={toggleComplete} 
        deleteTask={deleteTask} 
        deleteCompletedTasks={deleteCompletedTasks} 
        showDeleteAllButton={activeButton === 'completed' && filteredTasks.length > 0}
      />
      <div className="filter-buttons">
        <button
          className={activeButton === 'all' ? 'active' : 'normal'}
          onClick={() => handleFilterChange('all')}
        >
          All({tasks.length})
        </button>
        <button
          className={activeButton === 'completed' ? 'active' : 'normal'}
          onClick={() => handleFilterChange('completed')}
        >
          Completed ({tasks.filter(task => task.completed).length})
        </button>
        <button
          className={activeButton === 'pending' ? 'active' : 'normal'}
          onClick={() => handleFilterChange('pending')}
        >
          Undone ({tasks.filter(task => !task.completed).length})
        </button>
      </div>
      <div className="add-todo-form">
        <input
          type="text"
          placeholder="Task title"
          value={newTaskText}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARACTERS_TASK) {
              setNewTaskText(e.target.value);
            }
          }}
        />
        <input
          type="text"
          placeholder="Task description (optional)"
          value={newTaskDescription}
          onChange={(e) => {
            if (e.target.value.length <= MAX_CHARACTERS_DESCRIPTION) {
              setNewTaskDescription(e.target.value);
            }
          }}
        />
        <button className="add-todo-button" onClick={addTask}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default App;
