interface Todo {
  id: number;
  content: string;
}

let index: number = 0;
let startTodo: Todo[] = [];
let completeTodo: Todo[] = [];

const addTodoButton = document.querySelector(".todo_button");
const todoStartContainer = document.querySelector(".todo_start");
const todoCompleteContainer = document.querySelector(".todo_complete");

// 할 일 목록 렌더링
const renderTodo = () => {
  if (todoStartContainer) {
    let todoHTML: string = "";
    startTodo.map((todo: Todo) => {
      todoHTML += `
      <div class="todo_content">
        ${todo.content}
        <div class="todo_complete_button" data-id="${todo.id}">완료</div>
      </div>
        `;
    });
    todoStartContainer.innerHTML = todoHTML;
  }
};

// 완료 목록 렌더링
const completeRender = () => {
  if (todoCompleteContainer) {
    let todoHTML: string = "";
    completeTodo.map((todo: Todo) => {
      todoHTML += `
      <div class="todo_content">
    ${todo.content}
    <div class="todo_delete_button" data-id="${todo.id}">삭제</div>
  </div>
  `;
    });
    todoCompleteContainer.innerHTML = todoHTML;
  }
};

// 할 일 추가
const addTodo = () => {
  const todoInput = document.querySelector(".todo_input") as HTMLInputElement;
  const todoContent = todoInput.value;
  if (todoContent) {
    startTodo.push({ id: index++, content: todoContent });
    todoInput.value = "";
    renderTodo();
  }
};

// 할 일 완료
const complete = (targetNum: number) => {
  const findIndex = startTodo.findIndex((todo: Todo) => todo.id === targetNum);
  const newTodo = startTodo.filter((todo: Todo) => todo.id !== targetNum);
  if (startTodo[findIndex]) {
    completeTodo.push(startTodo[findIndex]);
    completeRender();
  }
  startTodo = newTodo;
  renderTodo();
};

// 할 일 삭제
const deleteTodo = (targetNum: number) => {
  const newTodo = completeTodo.filter((todo: Todo) => todo.id !== targetNum);
  completeTodo = newTodo;
  completeRender();
};

// 할 일 추가 버튼 addEventListener
addTodoButton?.addEventListener("click", addTodo);
// 할 일 완료 버튼 addEventListner
todoStartContainer?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.dataset.id) {
    complete(parseInt(target.dataset.id));
  }
});
// 완료 삭제 버튼 addEventListener
todoCompleteContainer?.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.dataset.id) {
    deleteTodo(parseInt(target.dataset.id));
  }
});
