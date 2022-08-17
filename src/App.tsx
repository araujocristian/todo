import { useState } from "react";
import { ClipboardText } from "phosphor-react";

import { Form, Header } from "./components";

import styles from "./App.module.css";
import { TodoItem } from "./components/TodoItem";

export interface Todo {
  title: string;
  isCompleted: boolean;
  id: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([] as Todo[]);

  const handleSetTodos = (todo: Todo) => {
    setTodos((oldTodos) => [...oldTodos, todo]);
  };

  const handleRemoveTodo = (todoId: string) => {
    const todosWithoutDeleted = todos.filter((todo) => todo.id !== todoId);

    setTodos(todosWithoutDeleted);
  };

  const handleChangeTodo = (todoId: string) => {
    const newTodoList = todos.map((todo) => {
      return todo.id === todoId
        ? {
            ...todo,
            isCompleted: !todo.isCompleted,
          }
        : todo;
    });

    setTodos(newTodoList);
  };

  const isEmptyTodoList = todos.length === 0;

  const todosCompletedCounter = todos.reduce((acc, todo) => {
    return todo.isCompleted ? acc + 1 : acc;
  }, 0);

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.content}>
        <Form onSetTodos={handleSetTodos} />
        <article className={styles.todoListContainer}>
          <header className={styles.todoInfos}>
            <div>
              <strong className={styles.textCreated}>Tarefas criadas</strong>
              <p className={styles.counter}>{todos.length}</p>
            </div>
            <div>
              <strong className={styles.textCompleted}>Concluídas</strong>
              <p className={styles.counter}>{todosCompletedCounter}</p>
            </div>
          </header>
          {isEmptyTodoList ? (
            <section className={styles.emptyTodoList}>
              <ClipboardText size={56} />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer </p>
            </section>
          ) : (
            <ul className={styles.todoList}>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  onDelete={handleRemoveTodo}
                  onChange={handleChangeTodo}
                />
              ))}
            </ul>
          )}
        </article>
      </main>
    </div>
  );
}

export default App;
