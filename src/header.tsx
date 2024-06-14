import { useTodos } from "./store";

export const Header = () => {
  const { total } = useTodos();

  return (
    <div>
      <h1>Задачи ({total})</h1>
    </div>
  );
};
