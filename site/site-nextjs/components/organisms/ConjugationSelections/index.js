import { useRouter } from "next/router";

import { useRef } from "react";
import { Conjugations } from "../../../constants/verbs";
import Button from "../../atoms/Button";
import Checkbox from "../../atoms/Checkbox";
import styles from "./styles.module.scss";

export default function ConjugationSelections() {
  const router = useRouter();

  const conjugations = []
    .concat(Conjugations.single, Conjugations.six)
    .filter((c) => c.key !== "English" && c.key !== "Infinitive");

  for (const c of conjugations) {
    c.ref = useRef(false);
  }

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {conjugations.map((conjugation) => (
          <li key={conjugation.key} className={styles.item}>
            <Checkbox ref={conjugation.ref}>{conjugation.label}</Checkbox>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-14">
        <Button
          theme="grey"
          onClick={() => {
            router.push("/flashcards");
          }}
        >
          Cancel
        </Button>
        <Button
          className="ml-3"
          onClick={() => {
            const filters = conjugations.filter((x) => x.ref.current);
            router.push({
              pathname: "/flashcards/infinitive-to-conjugations/quiz",
              query: {
                filters: filters.map((f) => f.key).join(","),
              },
            });
          }}
        >
          Start
        </Button>
      </div>
    </div>
  );
}
