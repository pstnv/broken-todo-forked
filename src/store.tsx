import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Todo } from "./types";

type StoreContextType = {
  todos: Todo[];
  isLoading: boolean;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  total: number;
};

const defaultValue: StoreContextType = {
  todos: [],
  isLoading: true,
  addTodo: () => {},
  toggleTodo: () => {},
  removeTodo: () => {},
  total: 0,
};

const StoreContext = createContext<StoreContextType>(defaultValue);

export const useTodos = () => {
  return useContext(StoreContext);
};

export const StoreProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [counter, setCounter] = useState<number>(0);

  const addTodo = (title: string) => {
    const newId = counter + 1;
    setTodos((prev) => [
      {
        id: newId,
        title,
        completed: false,
      },
      ...prev,
    ]);
    setCounter(newId);
  };

  const toggleTodo = (todoId: number) => {
    const index = todos.findIndex(({ id }) => id === todoId);
    const newTodos = [...todos];

    if (index != -1) {
      const currentTodo = newTodos[index];
      newTodos[index] = {
        ...currentTodo,
        completed: !currentTodo.completed,
      };
      setTodos(newTodos);
    }
  };

  const removeTodo = (todoId: number) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(({ id }) => id === todoId);

    if (index != -1) {
      newTodos.splice(index, 1);
      setTodos(newTodos);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const data: any = await response.json(); // пропущен await - метод .json() возвращает Promise
        const fetchedTodos = data.splice(0, 10);
        setTodos(fetchedTodos);
        setCounter(fetchedTodos[fetchedTodos.length - 1].id);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const sortList = (list: Todo[]) => {
    const sortedList: Todo[] = [...list].sort(
      (prev, next) => next.id - prev.id
    );
    return sortedList;
  };

  const contextValue: StoreContextType = {
    todos: useMemo(() => sortList(todos), [todos]),
    isLoading,
    addTodo,
    total: todos.length,
    toggleTodo,
    removeTodo,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
