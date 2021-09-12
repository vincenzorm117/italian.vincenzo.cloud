import styles from "./styles.module.scss";
import ConjugationSingleEdit from "../../molecules/ConjugationSingleEdit";
import { useQuery, useMutation } from "@apollo/client";
import { GQL_UPDATE_VERB, GQL_SINGLE_VERB_WITH_INFINITIVE } from "./gql";
import { Conjugations } from "../../../constants/verbs";
import ConjugationSixEdit from "../../molecules/ConjugationSixEdit";
import RoundButton from "../../atoms/RoundButton";
import { useRouter } from "next/router";
import { useRef } from "react";
import clone from "lodash/clone";
import has from "lodash/has";
import diff from "../../../helpers/diff";

export default function ReferenceVerbSingleEdit({ verbInfinitive }) {
  const router = useRouter();
  const verbRef = useRef(null);

  const [gqlUpdateVerb, mutationState] = useMutation(GQL_UPDATE_VERB);

  if (!mutationState.loading && has(mutationState, "data.updateVerb.id")) {
    // Navigate away from the edit page to view page
    router.push(router.asPath.replace(/\/[^/]+$/, ""));
  }

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

  if (verbRef.current === null) {
    verbRef.current = clone(data.verb);
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerSingle}>
        {Conjugations.single.map((c) => (
          <ConjugationSingleEdit
            key={c.label}
            className="my-10"
            title={c.label}
            verbRef={verbRef}
            field={c.key}
          />
        ))}
      </div>
      <div className={styles.containerSix}>
        {Conjugations.six.map((c) => (
          <ConjugationSixEdit
            key={c.label}
            className="my-10"
            title={c.label}
            verbRef={verbRef}
            keyPrefix={c.key}
            field={c.key}
          />
        ))}
      </div>
      <div className={styles.actions}>
        <RoundButton
          type="save"
          className="mb-3"
          onClick={() => {
            // Extract fields that we're changed
            const verb = diff(verbRef.current, data.verb);
            verb.id = data.verb.id;
            // Hit server to update verb
            gqlUpdateVerb({ variables: { verb } });
          }}
        />
        <RoundButton
          type="cancel"
          onClick={() => router.push(router.asPath.replace(/\/[^/]+$/, ""))}
        />
      </div>
    </div>
  );
}
