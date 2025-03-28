import { Todo } from "../../App";
import { useTodo } from "../../hook/useTodo";

export const TodoItem = ({ todo }: { todo: Todo }) => {
  const { completeTodo } = useTodo();
  return (
    <div className="render-container__item" key={todo.id}>
      <div className="render-container__item-text">{todo.content}</div>
      <button
        className="todo-container__button"
        onClick={() => completeTodo(todo)}
      >
        완료
      </button>
    </div>
  );
};
