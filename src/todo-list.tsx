import styled from "@emotion/styled";
import { useTodos } from "./store";
import { TodoItem } from "./todo-item";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TodoList = () => {
  const { todos, isLoading } = useTodos();

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (todos.length === 0) {
    return <div>Нет задач</div>;
  }

  return (
    <StyledList>
      {todos.map(({ id, title, completed }) => (
        <TodoItem key={id} id={id} title={title} completed={completed} />
      ))}
    </StyledList>
  );
};
