"use strict";
const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
let todos = [];
let dones = [];
const createListItem = (todo, isDone) => {
    const li = document.createElement("li");
    li.classList.add("list-container__item");
    li.textContent = todo.text;
    const button = document.createElement("button");
    if (isDone) {
        button.classList.add("list-container__item-button-remove");
        button.textContent = "삭제";
    }
    else {
        button.classList.add("list-container__item-button-complete");
        button.textContent = "완료";
    }
    button.addEventListener("click", () => {
        if (isDone) {
            removeDone(todo);
        }
        else {
            completeTodo(todo);
        }
    });
    li.appendChild(button);
    return li;
};
const renderList = () => {
    todoList.innerHTML = "";
    doneList.innerHTML = "";
    todos.forEach((t) => {
        const todoLi = createListItem(t, false);
        todoList.appendChild(todoLi);
    });
    dones.forEach((d) => {
        const doneLi = createListItem(d, true);
        doneList.appendChild(doneLi);
    });
};
const completeTodo = (todo) => {
    todos = todos.filter((t) => t.id !== todo.id);
    dones.push(todo);
    renderList();
};
const removeDone = (done) => {
    dones = dones.filter((d) => d.id !== done.id);
    renderList();
};
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        todos.push({ id: Date.now(), text });
        todoInput.value = "";
        renderList();
    }
});
