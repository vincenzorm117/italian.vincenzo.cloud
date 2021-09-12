export const SingleConjugation = [
  "Infinitive",
  "Participle_Past",
  "Gerund_Present",
];

export const isSingleConjugation = (conjugation) => {
  return SingleConjugation.includes(conjugation);
};

export const Conjugations = {
  single: [
    {
      key: "English",
      label: "English",
    },
    {
      key: "Infinitive",
      label: "Infinitive",
    },
    {
      key: "Participle_Past",
      label: "Participle Past",
    },
    {
      key: "Gerund_Present",
      label: "Gerund Present",
    },
  ],
  six: [
    {
      key: "Present",
      label: "Present",
    },
    {
      key: "Imperfect",
      label: "Imperfect",
    },
    {
      key: "Future",
      label: "Future",
    },
    {
      key: "Past",
      label: "Past",
    },
    {
      key: "Imperative",
      label: "Imperative",
    },
    {
      key: "Conditional",
      label: "Conditional",
    },
    {
      key: "Present_Subjunctive",
      label: "Present Subjunctive",
    },
    {
      key: "Imperfect_Subjunctive",
      label: "Imperfect Subjunctive",
    },
  ],
};
