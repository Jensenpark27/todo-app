import styles from "./Tabs.module.css";

// 여러 개 중 하나를 고르는 버튼 묶음
export default function Tabs({ label, options, value, onChange }) {
  return (
    <div className={styles.tabs} role="group" aria-label={label}>
      {options.map(({ id, label }) => (
        <button
          key={id}
          className={styles.tab}
          aria-pressed={value === id}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
