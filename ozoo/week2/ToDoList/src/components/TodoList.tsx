import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface Props {
  tasks: Task[];
  isDone: boolean;
}

const TodoList: React.FC<Props> = ({ tasks, isDone }) => {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{isDone ? '완료' : '할 일'}</h2>
      <ul className="render-container__list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} isDone={isDone} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;