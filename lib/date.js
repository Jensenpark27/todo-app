// 로컬 날짜 기준 YYYY-MM-DD (toISOString은 UTC라 날짜가 어긋날 수 있음)
export function todayString() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export function isOverdue(todo) {
  return !todo.done && todo.dueDate !== null && todo.dueDate < todayString();
}
