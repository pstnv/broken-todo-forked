import { useState } from "react";
import { useTodos } from "./store";

type Props = {
  children: any;
};

export const AddForm = ({ children }: Props) => {
  const { addTodo } = useTodos();

  const [text, setText] = useState("");

  const onChange = (e: any) => {
    setText(e.target.value.replace(/\d/g, "❄️")); // add "g" flag
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={text}
        onChange={onChange}
        placeholder="новая задача..."
      />
      {children}
    </form>
  );
};
