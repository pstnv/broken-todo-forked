import { AddTodo } from "./add-todo";
import { Header } from "./header";
import { StoreProvider, useTodos } from "./store";
import { TodoList } from "./todo-list";

export default function App() {
  return (
    <StoreProvider>
      <div className="App">
        <Header />
        <AddTodo />
        <TodoList />
      </div>
    </StoreProvider>
  );
}
