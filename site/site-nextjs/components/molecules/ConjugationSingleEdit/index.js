import { useCallback, useEffect, useRef } from "react";
import styles from "./styles.module.scss";

export default function ConjugationSingleEdit({
  title,
  verbRef,
  field,
  className = "",
}) {
  const inputRef = useRef();

  const handleChange = useCallback(
    (e) => {
      verbRef.current[field] = inputRef.current.value;
    },
    [verbRef, field]
  );

  useEffect(() => {
    inputRef.current.value = verbRef.current[field];
  }, []);

  return (
    <div className={className}>
      <h2 className={styles.title}>{title}</h2>
      <input
        ref={inputRef}
        type="text"
        className={styles.input}
        onChange={handleChange}
      />
    </div>
  );
}
