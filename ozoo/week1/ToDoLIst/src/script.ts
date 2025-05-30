// HTML 요소 가져오기
const todoInput = document.querySelector('#todo-input') as HTMLInputElement;
const todoForm = document.querySelector('#todo-form') as HTMLFormElement;
const todoList = document.querySelector('#todo-list') as HTMLUListElement;
const doneList = document.querySelector('#done-list') as HTMLUListElement;

// 할 일 타입 정의
type Todo = {
    id: number;
    text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// 할 일 렌더링 함수
const renderTasks = (): void => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo): void => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo): void => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};

// 입력값 가져오기
const getTodoText = (): string => {
    return todoInput.value.trim();
};

// 할 일 추가
const addTodo = (text: string): void => {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTasks();
};

// 할 일 완료 처리
const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t) => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};

// 완료된 할 일 삭제
const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t) => t.id !== todo.id);
    renderTasks();
};

// 할 일 리스트 요소 생성
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container__button');

    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = "#dc3545";
    } else {
        button.textContent = '완료';
        button.style.backgroundColor = "#28a745";
    }

    button.addEventListener('click', () => {
        if (isDone) {
            deleteTodo(todo);
        } else {
            completeTodo(todo);
        }
    });

    li.appendChild(button);
    return li;
};

// 폼 이벤트 리스너 추가
if (todoForm) {
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = getTodoText();
        if (text) {
            addTodo(text);
        }
    });
}

// 초기 렌더링
renderTasks();