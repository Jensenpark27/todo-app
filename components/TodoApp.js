"use client";

import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { loadTodos, saveTodos } from "@/lib/storage";

export default function TodoApp() {
  // 클라이언트에서만 렌더링되므로 첫 상태를 localStorage에서 바로 읽는다
  const [todos, setTodos] = useState(loadTodos);

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
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </>
  );
}
