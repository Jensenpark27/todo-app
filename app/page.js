"use client";

import dynamic from "next/dynamic";
import styles from "./page.module.css";

// localStorage를 쓰므로 서버 프리렌더링 없이 브라우저에서만 렌더링한다
const TodoApp = dynamic(() => import("@/components/TodoApp"), { ssr: false });

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>할 일</h1>
      <TodoApp />
    </main>
  );
}
