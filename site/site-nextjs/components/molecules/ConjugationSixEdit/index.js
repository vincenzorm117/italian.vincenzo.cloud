import { useCallback, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import get from "lodash/get";

export default function ConjugationSixEdit({
  title,
  verbRef,
  keyPrefix,
  className = "",
}) {
  const inputRef = {
    io: useRef(),
    tu: useRef(),
    lei: useRef(),
    noi: useRef(),
    voi: useRef(),
    loro: useRef(),
  };

  const update = useCallback(
    (key) => {
      verbRef.current[`${keyPrefix}_${key}`] = inputRef[key].current.value;
    },
    [verbRef, keyPrefix, inputRef]
  );

  useEffect(() => {
    for (const [key, ref] of Object.entries(inputRef)) {
      ref.current.value = get(verbRef.current, `${keyPrefix}_${key}`, "");
    }
  }, []);

  return (
    <div className={className}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.values}>
        <div className={styles.value} data-pronoun="io">
          <input
            ref={inputRef.io}
            type="text"
            className={styles.input}
            onChange={() => update("io")}
          />
        </div>
        <div className={styles.value} data-pronoun="noi">
          <input
            ref={inputRef.noi}
            type="text"
            className={styles.input}
            onChange={() => update("noi")}
          />
        </div>
        <div className={styles.value} data-pronoun="tu">
          <input
            ref={inputRef.tu}
            type="text"
            className={styles.input}
            onChange={() => update("tu")}
          />
        </div>
        <div className={styles.value} data-pronoun="voi">
          <input
            ref={inputRef.voi}
            type="text"
            className={styles.input}
            onChange={() => update("voi")}
          />
        </div>
        <div className={styles.value} data-pronoun="lui lei">
          <input
            ref={inputRef.lei}
            type="text"
            className={styles.input}
            onChange={() => update("lei")}
          />
        </div>
        <div className={styles.value} data-pronoun="loro">
          <input
            ref={inputRef.loro}
            type="text"
            className={styles.input}
            onChange={() => update("loro")}
          />
        </div>
      </div>
    </div>
  );
}
