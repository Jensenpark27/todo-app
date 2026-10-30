import { isOverdue } from "@/lib/date";
import styles from "./TodoItem.module.css";

export default function TodoItem({ todo, onToggle, onDelete }) {
  const overdue = isOverdue(todo);
  const className = [
    styles.item,
    todo.done && styles.done,
    overdue && styles.overdue,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className={className}>
      <input
        className={styles.check}
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        aria-label={`"${todo.text}" 완료`}
      />
      <div className={styles.body}>
        <span className={styles.text}>{todo.text}</span>
        {todo.dueDate && (
          <span className={styles.due}>
            마감 {todo.dueDate}
            {overdue && " · 지남"}
          </span>
        )}
      </div>
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
