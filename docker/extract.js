(() => {
  const pronouns = ["io", "tu", "lei", "noi", "voi", "loro"];

  const English = document
    .querySelector("#list-translations > p")
    .innerText.match(/^\w+/)[0];
  const Infinitive = document.querySelector(
    '#ch_divSimple [mobile-title="Infinito Presente"] ul li i:last-child'
  ).innerText;
  const Participle_Past = document.querySelector(
    '#ch_divSimple [mobile-title="Participio Passato"] ul li i:last-child'
  ).innerText;
  const Gerund_Present = document.querySelector(
    '#ch_divSimple [mobile-title="Gerundio Presente"] ul li i:last-child'
  ).innerText;

  const Present = [
    ...document.querySelectorAll(
      '#ch_divSimple [mobile-title="Indicativo Presente"] ul li i:last-child'
    ),
  ].map((x) => x.innerText);
  const Imperfect = [
    ...document.querySelectorAll(
      '#ch_divSimple [mobile-title="Indicativo Imperfetto"] ul li i:last-child'
    ),
  ].map((x) => x.innerText);
  const Future = [
    ...document.querySelectorAll(
      '#ch_divSimple [mobile-title="Indicativo Futuro semplice"] ul li i:last-child'
    ),
  ].map((x) => x.innerText);
  const Past = [
    ...document.querySelectorAll(
      '#ch_divSimple [mobile-title="Indicativo Passato remoto"] ul li i:last-child'
    ),
  ].map((x) => x.innerText);
  const Imperative = [
    ...document.querySelectorAll(
      '#ch_divSimple [mobile-title="Imperativo Presente"] ul li i:last-child'
    ),
  ].map((x) => x.innerText);
  const Conditional = [
    ...document.querySelectorAll(
      '#ch_divSimple [mobile-title="Condizionale Presente"] ul li i:last-child'
    ),
  ].map((x) => x.innerText);
  const Present_Subjunctive = [
    ...document.querySelectorAll(
      '#ch_divSimple [mobile-title="Congiuntivo Presente"] ul li i:last-child'
    ),
  ].map((x) => x.innerText);
  const Imperfect_Subjunctive = [
    ...document.querySelectorAll(
      '#ch_divSimple [mobile-title="Congiuntivo Imperfetto"] ul li i:last-child'
    ),
  ].map((x) => x.innerText);

  const conjugations = {
    single: {
      English,
      Infinitive,
      Participle_Past,
      Gerund_Present,
    },
    multiple: {
      Present,
      Imperfect,
      Future,
      Past,
      Imperative,
      Conditional,
      Present_Subjunctive,
      Imperfect_Subjunctive,
    },
  };
  console.log(conjugations);

  let keys = Object.keys(conjugations.single);
  let values = Object.values(conjugations.single);

  for (const [key, value] of Object.entries(conjugations.multiple)) {
    for (let i = 0; i < pronouns.length; i++) {
      keys.push(`${key}_${pronouns[i]}`);
      values.push(value[i]);
    }
  }

  keys = keys.join(", ");
  values = values.map((x) => `'${x}'`).join(", ");

  console.log(`INSERT INTO Verbs (${keys}) VALUES (${values})`);
})();
