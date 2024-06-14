import styled from "@emotion/styled";
import { useTodos } from "./store";

const StyledTaskItem = styled.li`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledText = styled.span<{ completed: boolean }>`
  text-decoration: ${({ completed }) =>
    completed ? "line-through red 2px" : "none"};
  cursor: pointer;

  &:hover {
    color: blue;
  }
`;

type Props = {
  id: number;
  title: string;
  completed: boolean;
};

export const TodoItem = ({ title, completed, id }: Props) => {
  const { toggleTodo, removeTodo } = useTodos();

  const onToggle = () => toggleTodo(id);

  const onRemove = () => removeTodo(id);

  return (
    <StyledTaskItem>
      {completed ? <span>✅</span> : <span>⛔️</span>}
      <StyledText completed={completed} onClick={onToggle}>
        [{id}] {title}
      </StyledText>
      <button onClick={onRemove}>X</button>
    </StyledTaskItem>
  );
};
