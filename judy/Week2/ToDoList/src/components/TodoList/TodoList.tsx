import { useTodo } from "../../hook/useTodo";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const { todoList } = useTodo();
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul className="render-container__list">
        {todoList.map((todo) => {
          return <TodoItem todo={todo} />;
        })}
      </ul>
    </div>
  );
};
