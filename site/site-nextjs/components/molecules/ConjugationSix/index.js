import styles from "./styles.module.scss";
import get from "lodash/get";

export default function ConjugationSix({
  title,
  verb,
  keyPrefix,
  className = "",
}) {
  return (
    <div className={className}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.values}>
        <div className={styles.value} data-pronoun="io">
          {get(verb, `${keyPrefix}_io`, "")}
        </div>
        <div className={styles.value} data-pronoun="noi">
          {get(verb, `${keyPrefix}_noi`, "")}
        </div>
        <div className={styles.value} data-pronoun="tu">
          {get(verb, `${keyPrefix}_tu`, "")}
        </div>
        <div className={styles.value} data-pronoun="voi">
          {get(verb, `${keyPrefix}_voi`, "")}
        </div>
        <div className={styles.value} data-pronoun="lui lei">
          {get(verb, `${keyPrefix}_lei`, "")}
        </div>
        <div className={styles.value} data-pronoun="loro">
          {get(verb, `${keyPrefix}_loro`, "")}
        </div>
      </div>
    </div>
  );
}
