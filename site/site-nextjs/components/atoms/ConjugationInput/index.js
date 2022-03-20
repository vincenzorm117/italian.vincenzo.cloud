import { forwardRef, useCallback, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

const ConjugationInput = forwardRef(
  (
    {
      label = null,
      className = "",
      disabled = false,
      solution = null,
      onPressEnter = () => {},
    },
    ref
  ) => {
    const params = {};
    const hasSolution = !!solution;

    if (typeof label === "string") {
      params["data-pronoun"] = label;
    }

    return (
      <div
        className={cn(
          hasSolution ? styles.valueSolved : styles.value,
          className
        )}
        disabled={disabled}
        {...params}
      >
        <div className={styles.inputContainer}>
          <input
            ref={ref}
            type="text"
            className={hasSolution ? styles.inputSolved : styles.input}
            disabled={disabled || hasSolution}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onPressEnter();
              }
            }}
          />
          {hasSolution && <div className={styles.solution}>{solution}</div>}
        </div>
      </div>
    );
  }
);

export default ConjugationInput;
