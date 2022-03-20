import Link from "next/link";
import styles from "./styles.module.scss";
import { useQuery } from "@apollo/client";
import { GQL_SEARCH_VERBS } from "./gql";

export default function SearchList({ searchTerm = "" }) {
  if (typeof searchTerm !== "string") {
    return <div className={styles.container}></div>;
  }

  const { loading, error, data } = useQuery(GQL_SEARCH_VERBS, {
    variables: { infinitive: searchTerm },
  });

  if (loading) {
    return (
      <div className={styles.container}>
        <h1 className="py-100">Loading...</h1>
      </div>
    );
  }

  if (error) {
    console.error(error);
    return (
      <div className={styles.container}>
        <h1 className="py-100">Error</h1>
        <p>{error.toString()}</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {data.verbs.list.map((verb) => (
          <li key={verb.id} className={styles.item}>
            <Link href={`/reference/${verb.Infinitive}`}>
              {verb.Infinitive}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
