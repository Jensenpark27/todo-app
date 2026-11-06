import TodoList from "./TodoList";
import { formatDateLabel, todayString } from "@/lib/date";
import styles from "./TodoGroupedList.module.css";

// 마감일별로 묶는다. 날짜가 빠른 묶음부터, 마감일 없는 할 일은 맨 아래
function groupByDueDate(todos) {
  const groups = new Map();
  for (const todo of todos) {
    const key = todo.dueDate ?? null;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(todo);
  }
  return [...groups.entries()].sort(([a], [b]) => {
    if (a === null) return 1;
    if (b === null) return -1;
    return a < b ? -1 : 1;
  });
}

function GroupHeading({ date }) {
  if (date === null) return <h2 className={styles.heading}>날짜 없음</h2>;

  const today = todayString();
  return (
    <h2 className={styles.heading}>
      {date === today && <span className={styles.today}>오늘 · </span>}
      {formatDateLabel(date)}
      {date < today && <span className={styles.past}> · 지남</span>}
    </h2>
  );
}

export default function TodoGroupedList({ todos, emptyMessage, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <div className={styles.groups}>
      {groupByDueDate(todos).map(([date, items]) => (
        <section key={date ?? "none"}>
          <GroupHeading date={date} />
          <TodoList todos={items} onToggle={onToggle} onDelete={onDelete} />
        </section>
      ))}
    </div>
  );
}
