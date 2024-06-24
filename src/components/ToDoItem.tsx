import React from 'react';

interface Task {
  id: number;
  text: string;
  description: string;
  category: string;
  completed: boolean;
}

interface ToDoItemProps {
  task: Task;
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ task, toggleComplete, deleteTask }) => {
  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <div className="checkbox" onClick={() => toggleComplete(task.id)}>
        {task.completed && <span>&#10003;</span>}
      </div>
      <div className="task-info">
        <span className={`text ${task.completed ? 'completed-text' : ''}`}>{task.text}</span>
        <span className={`description ${task.completed ? 'completed-text' : ''}`}>{task.description}</span>
      </div>
      <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
};

export default ToDoItem;
