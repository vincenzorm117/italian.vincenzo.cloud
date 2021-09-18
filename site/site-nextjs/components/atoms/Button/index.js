import styles from "./styles.module.scss";
import cn from "classnames";

export default function Button({
  theme = "primary",
  children,
  onClick = null,
  className = "",
}) {
  const params = {};

  if (styles.hasOwnProperty(theme)) {
    params.className = cn(className, styles[theme]);
  } else {
    params.className = cn(className, styles.primary);
  }

  if (typeof onClick === "function") {
    params.onClick = onClick;
  }

  return <button {...params}>{children}</button>;
}
