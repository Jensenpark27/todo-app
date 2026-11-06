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

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

// "2026-11-05" → "11월 5일 (목)". new Date("YYYY-MM-DD")는 UTC로 해석되므로 직접 나눈다
export function formatDateLabel(dateString) {
  const [y, m, d] = dateString.split("-").map(Number);
  const weekday = WEEKDAYS[new Date(y, m - 1, d).getDay()];
  return `${m}월 ${d}일 (${weekday})`;
}
