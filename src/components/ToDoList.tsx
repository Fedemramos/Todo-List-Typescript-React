import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '/src/App.css';

interface Task {
  id: number;
  text: string;
  description?: string;
  category: string;
  completed: boolean;
}

interface ToDoListProps {
  tasks: Task[];
  toggleComplete: (id: number) => void;
  deleteTask: (id: number) => void;
  deleteCompletedTasks: () => void;
  showDeleteAllButton: boolean;
}

const ToDoList: React.FC<ToDoListProps> = ({ tasks, toggleComplete, deleteTask, deleteCompletedTasks, showDeleteAllButton }) => {
  return (
    <div className="todo-list">
      <TransitionGroup>
        {tasks.map(task => (
          <CSSTransition key={task.id} classNames="task" timeout={500}>
            <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
              <div className="checkbox" onClick={() => toggleComplete(task.id)}>
                {task.completed && <span>&#10003;</span>}
              </div>
              <div className="task-info" onClick={() => toggleComplete(task.id)}>
                <span className={`text ${task.completed ? 'completed-text' : ''}`}>{task.text}</span>
                <span className={`description ${task.completed ? 'completed-text' : ''}`}>{task.description}</span>
              </div>
              <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
      {showDeleteAllButton && (
        <button className="delete-all-button" onClick={deleteCompletedTasks}>Delete All</button>
      )}
    </div>
  );
};

export default ToDoList;
