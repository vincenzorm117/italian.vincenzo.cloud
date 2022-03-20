import cn from "classnames";
import styles from "./styles.module.scss";
import { useQuery } from "@apollo/client";
import { GQL_SINGLE_VERB_WITH_INFINITIVE, GQL_TOTAL_VERBS } from "./gql";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuizContext } from "../../../providers/VerbQuizzerProvider";
import { client } from "../../../services/graphql";
import Button from "../../atoms/Button";
import ConjugationInput from "../../atoms/ConjugationInput";

export default function FlashcardInfinitiveToConjugation({}) {
  const router = useRouter();
  const quizService = useQuizContext();

  // State
  const [verbId, setVerbId] = useState(null);
  const [conjugation, setConjugation] = useState(null);
  const [answerDiff, setAnswerDiff] = useState(null);

  const _pronouns = [
    { ref: useRef(""), label: "io", disabledHook: useState(false) },
    { ref: useRef(""), label: "noi", disabledHook: useState(false) },
    { ref: useRef(""), label: "tu", disabledHook: useState(false) },
    { ref: useRef(""), label: "voi", disabledHook: useState(false) },
    { ref: useRef(""), label: "lei", disabledHook: useState(false) },
    { ref: useRef(""), label: "loro", disabledHook: useState(false) },
  ];

  // Get total verbs in database
  useEffect(async () => {
    if (!router.isReady) return;

    const { data, loading, error } = await client.query({
      query: GQL_TOTAL_VERBS,
    });

    if (isNaN(data?.verbs?.total) || data?.verbs?.total <= 0) {
      throw new Error("500 Internal app error.");
    }

    quizService.setTotal(data?.verbs?.total);
    nextQuestion();

    // const onPressEnter = useCallback(
    //   (e) => {
    //     if (e.key === "Enter") {
    //       if (answerDiff === null) {
    //         checkQuestions();
    //       } else {
    //         nextQuestion();
    //       }
    //     }
    //   },
    //   [answerDiff, nextQuestion, checkQuestions]
    // );

    // window.addEventListener("keydown", onPressEnter, true);

    // return () => {
    //   window.removeEventListener("keydown", onPressEnter, true);
    // };
  }, [router.isReady]);

  // [Callback] Get next question
  const nextQuestion = useCallback(() => {
    // Set tense/aspect
    const filters = router.query.filters.split(",");
    const filterIndex = Math.floor(Math.random() * filters.length);
    setConjugation(filters[filterIndex]);
    // Set next verb
    setVerbId(quizService.nextVerb());
    // Set pronouns
    for (const value of Object.values(_pronouns)) {
      // value.disabledHook[1](Math.random() > 0.5);
      value.disabledHook[1](false);
      if (value?.ref?.current?.value) {
        value.ref.current.value = "";
      }
    }
    setAnswerDiff(null);
  }, [setConjugation, setVerbId, router.isReady, _pronouns]);

  useEffect(() => {
    if (answerDiff === null) {
      const field = _pronouns.find((x) => !x.disabledHook[0]);
      if (field?.ref?.current?.focus) {
        field?.ref?.current?.focus();
      }
    }
  }, [answerDiff, _pronouns]);

  // [Step] Query for verb
  const { loading, error, data } = useQuery(GQL_SINGLE_VERB_WITH_INFINITIVE, {
    variables: { id: verbId },
  });

  // [Callback] Check answer
  const checkQuestions = useCallback(() => {
    const verb = data?.verb;

    const d = {};
    for (const p of Object.values(_pronouns)) {
      if (!p.disabledHook[0]) {
        const value = p?.ref?.current?.value ?? "";
        const original = verb[`${conjugation}_${p.label}`];

        if (original !== value) {
          d[p.label] = { original, value };
        }
      }
    }

    setAnswerDiff(d);
  }, [conjugation, _pronouns, data?.verb]);

  if (!data?.verb || !conjugation) {
    return null;
  }

  const verb = data?.verb;

  return (
    <div
      onKeyPressCapture={(e) => {
        if (e.key === "Enter") {
          if (answerDiff === null) {
            checkQuestions();
          } else {
            nextQuestion();
          }
        }
      }}
    >
      <div className="text-center my-20">
        <h1 className={styles.infinitive}>{verb.Infinitive}</h1>
        <h2 className={styles.tenseAspect}>{conjugation}</h2>
      </div>
      <hr className={styles.greenBar} />

      <div className={cn("m-auto max-w-max mb-10 mt-20", styles.grid)}>
        {_pronouns.map((p) => (
          <ConjugationInput
            key={p.label}
            ref={p.ref}
            label={p.label}
            disabled={p.disabledHook[0]}
            solution={answerDiff?.[p.label]?.original ?? null}
          />
        ))}
      </div>

      <div className="flex justify-center">
        {answerDiff === null && (
          <Button theme="brightGreen" onClick={() => checkQuestions()}>
            Submit
          </Button>
        )}
        {answerDiff !== null && (
          <Button theme="brightBlue" onClick={() => nextQuestion()}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
