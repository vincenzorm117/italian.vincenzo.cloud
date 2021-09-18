import cn from "classnames";
import styles from "./styles.module.scss";
import uuidv4 from "../../../helpers/uuidv4";
import { forwardRef } from "react";

const Checkbox = forwardRef(({ children = null }, ref) => {
  const id = uuidv4();

  return (
    <div className={cn(styles.container, "flex items-center")}>
      <input
        className={cn(styles.input, "")}
        type="checkbox"
        id={id}
        onChange={(e) => (ref.current = e.target.checked)}
      />
      <label className={cn(styles.label, "flex items-center")} htmlFor={id}>
        {children}
      </label>
    </div>
  );
});

export default Checkbox;
