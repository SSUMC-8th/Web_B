const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

interface Todo {
  id: number;
  text: string;
}

let todos: Todo[] = [];
let dones: Todo[] = [];

const createListItem = (todo: Todo, isDone: boolean): HTMLElement => {
  const li = document.createElement("li");
  li.classList.add("list-container__item");
  li.textContent = todo.text;

  const button = document.createElement("button");

  if (isDone) {
    button.classList.add("list-container__item-button-remove");
    button.textContent = "삭제";
  } else {
    button.classList.add("list-container__item-button-complete");
    button.textContent = "완료";
  }

  button.addEventListener("click", (): void => {
    if (isDone) {
      removeDone(todo);
    } else {
      completeTodo(todo);
    }
  });

  li.appendChild(button);
  return li;
};

const renderList = (): void => {
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

const completeTodo = (todo: Todo): void => {
  todos = todos.filter((t) => t.id !== todo.id);
  dones.push(todo);
  renderList();
};

const removeDone = (done: Todo): void => {
  dones = dones.filter((d) => d.id !== done.id);
  renderList();
};

todoForm.addEventListener("submit", (e: Event): void => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ id: Date.now(), text });
    todoInput.value = "";
    renderList();
  }
});
