import { useContext } from "react";
import { TodoContext } from "../context/TodoProvider";

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo는 반드시 TodoProvider 내부에서 사용되어야 한다.");
  }
  return context;
};
