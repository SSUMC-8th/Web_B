import React, { useState } from 'react';

interface Props {
  onAdd: (text: string) => void;
}

const TodoInput: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (trimmed) {
      onAdd(trimmed);
      setText('');
    }
  };

  return (
    <form id = "todo-form" className ="todo-container__form" onSubmit={handleSubmit}>
      <input className = "todo-container__input" id = "todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일 입력"
        required
      />
      <button type="submit" className= "todo-container__button">할 일 추가</button>
    </form>
  );
};

export default TodoInput;