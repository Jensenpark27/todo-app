import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

export default function TodoList({ todos, emptyMessage, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
