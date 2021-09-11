const fieldNames = [
    'id',
    'English',
    'Infinitive',
    'Participle_Past',
    'Gerund_Present',

    'Present_io',
    'Present_tu',
    'Present_lei',
    'Present_noi',
    'Present_voi',
    'Present_loro',

    'Imperfect_io',
    'Imperfect_tu',
    'Imperfect_lei',
    'Imperfect_noi',
    'Imperfect_voi',
    'Imperfect_loro',

    'Future_io',
    'Future_tu',
    'Future_lei',
    'Future_noi',
    'Future_voi',
    'Future_loro',

    'Past_io',
    'Past_tu',
    'Past_lei',
    'Past_noi',
    'Past_voi',
    'Past_loro',

    'Imperative_io',
    'Imperative_tu',
    'Imperative_lei',
    'Imperative_noi',
    'Imperative_voi',
    'Imperative_loro',

    'Conditional_io',
    'Conditional_tu',
    'Conditional_lei',
    'Conditional_noi',
    'Conditional_voi',
    'Conditional_loro',

    'Present_Subjunctive_io',
    'Present_Subjunctive_tu',
    'Present_Subjunctive_lei',
    'Present_Subjunctive_noi',
    'Present_Subjunctive_voi',
    'Present_Subjunctive_loro',

    'Imperfect_Subjunctive_io',
    'Imperfect_Subjunctive_tu',
    'Imperfect_Subjunctive_lei',
    'Imperfect_Subjunctive_noi',
    'Imperfect_Subjunctive_voi',
    'Imperfect_Subjunctive_loro',
]

const verbFields = new Set()

for (const v of fieldNames) {
    verbFields.add(v)
}

exports.verbFields = verbFields
