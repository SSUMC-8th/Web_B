import { useTodo } from "../../hook/useTodo";

export const TodoForm = () => {
  const { text, onChange, addTodo } = useTodo();
  return (
    <form className="todo-container__form">
      <input
        type="text"
        className="todo-container__input"
        placeholder="할 일 입력"
        value={text}
        onChange={onChange}
      />
      <button
        type="submit"
        className="todo-container__button"
        onClick={addTodo}
      >
        할 일 추가
      </button>
    </form>
  );
};
