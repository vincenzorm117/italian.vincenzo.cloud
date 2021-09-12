import IconMagnifyingGlass from "../../atoms/Icons/svgs/IconMagnifyingGlass.svg";
import styles from "./styles.module.scss";

export default function Search({ onSearch = null }) {
  // Setup event lister to trigger onSearch
  const params = {};
  if (typeof onSearch === "function") {
    params.onKeyDown = (e) => {
      if (e.key === "Enter") {
        onSearch(e.target.value);
      }
    };
  }

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <IconMagnifyingGlass />
      </div>
      <input
        className={styles.input}
        type="text"
        placeholder="Search..."
        {...params}
      />
    </div>
  );
}
