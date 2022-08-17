import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { v4 as uuid } from "uuid";
import { Todo } from "../App";

import styles from "./Form.styles.module.css";

interface FormProps {
  onSetTodos: (todo: Todo) => void;
}

export function Form({ onSetTodos }: FormProps) {
  const [newTodoText, setNewTodoText] = useState("");

  const handleCreateNewTodo = (event: FormEvent) => {
    event.preventDefault();

    const newTodo = {
      id: uuid(),
      title: newTodoText,
      isCompleted: false,
    };

    onSetTodos(newTodo);
    setNewTodoText("");
  };

  const handleNewTodoTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.setCustomValidity("");
    setNewTodoText(event.target.value);
  };

  const handleNewCommentInvalid = (event: InvalidEvent<HTMLInputElement>) => {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  };

  return (
    <form className={styles.form} onSubmit={handleCreateNewTodo}>
      <input
        onChange={handleNewTodoTitleChange}
        onInvalid={handleNewCommentInvalid}
        placeholder="Adicione uma nova tarefa"
        type="text"
        value={newTodoText}
        required
      />
      <button type="submit">
        Criar
        <PlusCircle size={16} />
      </button>
    </form>
  );
}
