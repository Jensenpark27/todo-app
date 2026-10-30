const KEY = "todos";

export function loadTodos() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveTodos(todos) {
  try {
    localStorage.setItem(KEY, JSON.stringify(todos));
  } catch {
    // 저장 공간 부족 등 — 저장만 건너뛴다
  }
}
