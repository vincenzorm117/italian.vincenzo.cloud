import styles from "./styles.module.scss";
import Search from "../../molecules/Search";
import { useState } from "react";
import SearchList from "../../molecules/SearchList";

export default function ReferenceSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.search}>
          <Search onSearch={(s) => setSearchTerm(s)} />
        </div>
      </div>
      <div>
        <SearchList searchTerm={searchTerm} />
      </div>
    </div>
  );
}
