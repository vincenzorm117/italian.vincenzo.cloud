import styles from "./styles.module.scss";

export default function ConjugationSingle({ title, value, className = "" }) {
  return (
    <div className={className}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
