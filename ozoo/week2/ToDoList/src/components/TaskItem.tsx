import React, { useContext } from 'react';
import { Task } from '../types';
import { TodoContext } from '../App';

interface Props {
  task: Task;
  isDone: boolean;
}

const TaskItem: React.FC<Props> = ({ task, isDone }) => {
  const context = useContext(TodoContext);

  if (!context) return null;

  const { completeTask, deleteTask } = context;

  const handleClick = () => {
    if (isDone) deleteTask(task);
    else completeTask(task);
  };

  return (
    <li className="render-container__item">
      {task.text}
      <button
        className="render-container__item-button"
        style={{ backgroundColor: isDone ? '#dc3545' : '#28a745' }}
        onClick={handleClick}
      >
        {isDone ? '삭제' : '완료'}
      </button>
    </li>
  );
};

export default TaskItem;