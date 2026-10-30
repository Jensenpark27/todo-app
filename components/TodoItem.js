import styles from "./TodoItem.module.css";

export default function TodoItem({ todo, onDelete }) {
  return (
    <li className={styles.item}>
      <span className={styles.text}>{todo.text}</span>
      <button
        className={styles.delete}
        onClick={() => onDelete(todo.id)}
        aria-label={`"${todo.text}" 삭제`}
      >
        삭제
      </button>
    </li>
  );
}
