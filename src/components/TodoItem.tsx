import { Trash } from "phosphor-react";
import { Todo } from "../App";

import styles from "./TodoItem.styles.module.css";

interface TodoItemProps extends Todo {
  onDelete: (todoId: string) => void;
  onChange: (todoId: string) => void;
}

export function TodoItem({
  title,
  isCompleted,
  id,
  onDelete,
  onChange,
}: TodoItemProps) {
  return (
    <li className={styles.container}>
      <label
        className={
          isCompleted
            ? `${styles.todoInfo} ${styles.titleCompleted}`
            : styles.todoInfo
        }
      >
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isCompleted}
          onChange={() => onChange(id)}
        />
        {title}
      </label>
      <button className={styles.deleteButton} onClick={() => onDelete(id)}>
        <Trash />
      </button>
    </li>
  );
}
