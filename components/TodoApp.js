"use client";

import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoGroupedList from "./TodoGroupedList";
import { loadTodos, saveTodos } from "@/lib/storage";
import styles from "./TodoApp.module.css";

const VIEWS = [
  { id: "all", label: "전체" },
  { id: "date", label: "날짜별" },
];

export default function TodoApp() {
  // 클라이언트에서만 렌더링되므로 첫 상태를 localStorage에서 바로 읽는다
  const [todos, setTodos] = useState(loadTodos);
  const [view, setView] = useState("all");

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo(text, dueDate) {
    const todo = {
      id: crypto.randomUUID(),
      text,
      done: false,
      dueDate,
      createdAt: Date.now(),
    };
    setTodos((prev) => [todo, ...prev]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <TodoForm onAdd={addTodo} />
      <div className={styles.tabs} role="group" aria-label="보기 방식">
        {VIEWS.map(({ id, label }) => (
          <button
            key={id}
            className={styles.tab}
            aria-pressed={view === id}
            onClick={() => setView(id)}
          >
            {label}
          </button>
        ))}
      </div>
      {view === "all" ? (
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      ) : (
        <TodoGroupedList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      )}
    </>
  );
}
