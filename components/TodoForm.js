"use client";

import { useState } from "react";
import styles from "./TodoForm.module.css";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력하세요"
        aria-label="할 일"
        autoFocus
      />
      <button className={styles.button} type="submit">
        추가
      </button>
    </form>
  );
}
