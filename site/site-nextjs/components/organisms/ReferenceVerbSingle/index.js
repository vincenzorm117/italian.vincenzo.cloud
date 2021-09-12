import styles from "./styles.module.scss";
import ConjugationSingle from "../../molecules/ConjugationSingle";
import { useQuery } from "@apollo/client";
import { GQL_SINGLE_VERB_WITH_INFINITIVE } from "./gql";
import { Conjugations } from "../../../constants/verbs";
import ConjugationSix from "../../molecules/ConjugationSix";
import RoundButton from "../../atoms/RoundButton";
import { useRouter } from "next/router";

export default function ReferenceVerbSingle({ verbInfinitive }) {
  const router = useRouter();

  const { loading, error, data } = useQuery(GQL_SINGLE_VERB_WITH_INFINITIVE, {
    variables: { infinitive: verbInfinitive },
  });

  if (loading) {
    return (
      <div className={styles.container}>
        {/* <h1 className="py-100">Loading...</h1> */}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h1 className="py-100">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  const { verb } = data;

  return (
    <div className={styles.container}>
      <div className={styles.containerSingle}>
        {Conjugations.single.map((c) => (
          <ConjugationSingle
            key={c.label}
            className="my-10"
            title={c.label}
            value={verb[c.key]}
          />
        ))}
      </div>
      <div className={styles.containerSix}>
        {Conjugations.six.map((c) => (
          <ConjugationSix
            key={c.label}
            className="my-10"
            title={c.label}
            verb={verb}
            keyPrefix={c.key}
          />
        ))}
      </div>
      <div className={styles.actions}>
        <RoundButton
          type="edit"
          className="mb-3"
          onClick={() => router.push(`${router.asPath}/edit`)}
        />
        <RoundButton type="removeRed" />
      </div>
    </div>
  );
}
