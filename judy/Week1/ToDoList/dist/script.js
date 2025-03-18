"use strict";
let index = 0;
let startTodo = [];
let completeTodo = [];
const addTodoButton = document.querySelector(".todo_button");
const todoStartContainer = document.querySelector(".todo_start");
const todoCompleteContainer = document.querySelector(".todo_complete");
const renderTodo = () => {
    if (todoStartContainer) {
        let todoHTML = "";
        startTodo.map((todo) => {
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
const completeRender = () => {
    if (todoCompleteContainer) {
        let todoHTML = "";
        completeTodo.map((todo) => {
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
const addTodo = () => {
    const todoInput = document.querySelector(".todo_input");
    const todoContent = todoInput.value;
    if (todoContent) {
        startTodo.push({ id: index++, content: todoContent });
        todoInput.value = "";
        renderTodo();
    }
};
const complete = (targetNum) => {
    const findIndex = startTodo.findIndex((todo) => todo.id === targetNum);
    const newTodo = startTodo.filter((todo) => todo.id !== targetNum);
    if (startTodo[findIndex]) {
        completeTodo.push(startTodo[findIndex]);
        completeRender();
    }
    startTodo = newTodo;
    renderTodo();
};
const deleteTodo = (targetNum) => {
    const newTodo = completeTodo.filter((todo) => todo.id !== targetNum);
    completeTodo = newTodo;
    completeRender();
};
addTodoButton === null || addTodoButton === void 0 ? void 0 : addTodoButton.addEventListener("click", addTodo);
todoStartContainer === null || todoStartContainer === void 0 ? void 0 : todoStartContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.id) {
        complete(parseInt(target.dataset.id));
    }
});
todoCompleteContainer === null || todoCompleteContainer === void 0 ? void 0 : todoCompleteContainer.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.id) {
        deleteTodo(parseInt(target.dataset.id));
    }
});
