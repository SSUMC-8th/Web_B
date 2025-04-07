import "./App.css";
import { TodoForm } from "./components/TodoForm/TodoForm";
import { TodoList } from "./components/TodoList/TodoList";
import { CompletedTodoList } from "./components/CompletedTodoList/CompletedTodoList";

function App() {
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>
      <TodoForm />
      <div className="render-container">
        <TodoList />
        <CompletedTodoList />
      </div>
    </div>
  );
}

export default App;
