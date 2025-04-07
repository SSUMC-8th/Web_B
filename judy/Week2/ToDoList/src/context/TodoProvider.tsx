import { createContext, ReactNode, useState } from "react";

export interface Todo {
  content: string;
  id: number;
}

interface TodoContextType {
  text: string;
  todoList: Todo[];
  completeTodoList: Todo[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTodo: (e: React.FormEvent) => void;
  completeTodo: (completeTodo: Todo) => void;
  deleteTodo: (deleteTodo: Todo) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [text, setText] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [completeTodoList, setCompleteTodoList] = useState<Todo[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodoList((prev) => [...prev, { content: text, id: Date.now() }]);
    setText("");
  };

  const completeTodo = (completeTodo: Todo) => {
    const newTodo = todoList.filter((todo) => todo.id !== completeTodo.id);
    setTodoList(newTodo);
    setCompleteTodoList((prev) => [...prev, completeTodo]);
  };

  const deleteTodo = (deleteTodo: Todo) => {
    const newCompleteTodo = completeTodoList.filter(
      (todo) => todo.id !== deleteTodo.id
    );
    setCompleteTodoList(newCompleteTodo);
  };

  return (
    <TodoContext.Provider
      value={{
        text,
        todoList,
        completeTodoList,
        onChange,
        addTodo,
        completeTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
