"use client";

import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import TodoGroupedList from "./TodoGroupedList";
import Tabs from "./Tabs";
import { loadTodos, saveTodos } from "@/lib/storage";
import styles from "./TodoApp.module.css";

const FILTERS = [
  { id: "all", label: "전체", empty: "할 일이 없습니다", match: () => true },
  {
    id: "active",
    label: "진행 중",
    empty: "진행 중인 할 일이 없습니다",
    match: (todo) => !todo.done,
  },
  {
    id: "done",
    label: "완료",
    empty: "완료한 할 일이 없습니다",
    match: (todo) => todo.done,
  },
];

const VIEWS = [
  { id: "list", label: "목록" },
  { id: "date", label: "날짜별" },
];

export default function TodoApp() {
  // 클라이언트에서만 렌더링되므로 첫 상태를 localStorage에서 바로 읽는다
  const [todos, setTodos] = useState(loadTodos);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("list");

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

  const currentFilter = FILTERS.find((f) => f.id === filter);
  const visibleTodos = todos.filter(currentFilter.match);
  const listProps = {
    todos: visibleTodos,
    emptyMessage: currentFilter.empty,
    onToggle: toggleTodo,
    onDelete: deleteTodo,
  };

  return (
    <>
      <TodoForm onAdd={addTodo} />
      <div className={styles.toolbar}>
        <Tabs
          label="상태 필터"
          options={FILTERS}
          value={filter}
          onChange={setFilter}
        />
        <Tabs label="보기 방식" options={VIEWS} value={view} onChange={setView} />
      </div>
      {view === "list" ? (
        <TodoList {...listProps} />
      ) : (
        <TodoGroupedList {...listProps} />
      )}
    </>
  );
}
