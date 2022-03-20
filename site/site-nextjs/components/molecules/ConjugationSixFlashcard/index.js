import { useCallback, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import get from "lodash/get";

export default function ConjugationSixFlashcard({
  title = null,
  verbRef,
  keyPrefix,
  className = "",
  disabledFields = null,
}) {
  const inputRef = {
    io: useRef(),
    tu: useRef(),
    lei: useRef(),
    noi: useRef(),
    voi: useRef(),
    loro: useRef(),
  };

  const disabled = {
    io: get(disabledFields, "io", false),
    tu: get(disabledFields, "tu", false),
    lei: get(disabledFields, "lei", false),
    noi: get(disabledFields, "noi", false),
    voi: get(disabledFields, "voi", false),
    loro: get(disabledFields, "loro", false),
  };

  const update = useCallback(
    (key) => {
      verbRef.current[`${keyPrefix}_${key}`] = inputRef[key].current.value;
    },
    [verbRef, keyPrefix, inputRef]
  );

  return (
    <div className={className}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.values}>
        <div className={styles.value} data-pronoun="io" disabled={disabled.io}>
          <input
            ref={inputRef.io}
            type="text"
            className={styles.input}
            onChange={() => update("io")}
            disabled={disabled.io}
          />
        </div>
        <div
          className={styles.value}
          data-pronoun="noi"
          disabled={disabled.noi}
        >
          <input
            ref={inputRef.noi}
            type="text"
            className={styles.input}
            onChange={() => update("noi")}
            disabled={disabled.noi}
          />
        </div>
        <div className={styles.value} data-pronoun="tu" disabled={disabled.tu}>
          <input
            ref={inputRef.tu}
            type="text"
            className={styles.input}
            onChange={() => update("tu")}
            disabled={disabled.tu}
          />
        </div>
        <div
          className={styles.value}
          data-pronoun="voi"
          disabled={disabled.voi}
        >
          <input
            ref={inputRef.voi}
            type="text"
            className={styles.input}
            onChange={() => update("voi")}
            disabled={disabled.voi}
          />
        </div>
        <div
          className={styles.value}
          data-pronoun="lui lei"
          disabled={disabled.lei}
        >
          <input
            ref={inputRef.lei}
            type="text"
            className={styles.input}
            onChange={() => update("lei")}
            disabled={disabled.lei}
          />
        </div>
        <div
          className={styles.value}
          data-pronoun="loro"
          disabled={disabled.loro}
        >
          <input
            ref={inputRef.loro}
            type="text"
            className={styles.input}
            onChange={() => update("loro")}
            disabled={disabled.loro}
          />
        </div>
      </div>
    </div>
  );
}
