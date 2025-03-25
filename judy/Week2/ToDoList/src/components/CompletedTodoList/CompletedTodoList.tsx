import { useTodo } from "../../hook/useTodo";

export const CompletedTodoList = () => {
  const { completeTodoList, deleteTodo } = useTodo();
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
      <ul className="render-container__list">
        {completeTodoList.map((todo) => {
          return (
            <div className="render-container__item" key={todo.id}>
              <div className="render-container__item-text">{todo.content}</div>
              <button
                className="render-container__item-button"
                onClick={() => deleteTodo(todo)}
              >
                삭제
              </button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
