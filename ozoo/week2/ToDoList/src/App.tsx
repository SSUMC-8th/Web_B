import React, { useState, createContext } from 'react';
import { Task } from './types';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

interface TodoContextType {
  completeTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
}

export const TodoContext = createContext<TodoContextType | null>(null);

const App: React.FC = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  const completeTask = (task: Task) => {
    setTodos(todos.filter((t) => t.id !== task.id));
    setDoneTasks([...doneTasks, task]);
  };

  const deleteTask = (task: Task) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
  };

  return (
    <TodoContext.Provider value={{ completeTask, deleteTask }}>
      <div className="App">
        <div className="todo-container">
          <h1 className="todo-container__header">YoungJu TODO</h1>
          <TodoInput onAdd={addTodo} />
          <div className="render-container">
            <div className="render-container__section">
              <TodoList
                tasks={todos}
                isDone={false}
              />
            </div>
            <div className="render-container__section">
              <TodoList
                tasks={doneTasks}
                isDone={true}
              />
            </div>
          </div>
        </div>
      </div>
    </TodoContext.Provider>
  );
};

export default App;