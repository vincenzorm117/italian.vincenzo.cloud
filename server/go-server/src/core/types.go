package core

import "database/sql"

type Ctx struct {
	Db *sql.DB
}

type Verb struct {
	Id              int    `json:"id"`
	English         string `json:"english"`
	Infinitive      string `json:"infinitive"`
	Participle_Past string `json:"participle_past"`
	Gerund_Present  string `json:"gerund_present"`

	Present_io   string `json:"present_io"`
	Present_tu   string `json:"present_tu"`
	Present_lei  string `json:"present_lei"`
	Present_noi  string `json:"present_noi"`
	Present_voi  string `json:"present_voi"`
	Present_loro string `json:"present_loro"`

	Imperfect_io   string `json:"imperfect_io"`
	Imperfect_tu   string `json:"imperfect_tu"`
	Imperfect_lei  string `json:"imperfect_lei"`
	Imperfect_noi  string `json:"imperfect_noi"`
	Imperfect_voi  string `json:"imperfect_voi"`
	Imperfect_loro string `json:"imperfect_loro"`

	Future_io   string `json:"future_io"`
	Future_tu   string `json:"future_tu"`
	Future_lei  string `json:"future_lei"`
	Future_noi  string `json:"future_noi"`
	Future_voi  string `json:"future_voi"`
	Future_loro string `json:"future_loro"`

	Past_io   string `json:"past_io"`
	Past_tu   string `json:"past_tu"`
	Past_lei  string `json:"past_lei"`
	Past_noi  string `json:"past_noi"`
	Past_voi  string `json:"past_voi"`
	Past_loro string `json:"past_loro"`

	Imperative_io   string `json:"imperative_io"`
	Imperative_tu   string `json:"imperative_tu"`
	Imperative_lei  string `json:"imperative_lei"`
	Imperative_noi  string `json:"imperative_noi"`
	Imperative_voi  string `json:"imperative_voi"`
	Imperative_loro string `json:"imperative_loro"`

	Conditional_io   string `json:"conditional_io"`
	Conditional_tu   string `json:"conditional_tu"`
	Conditional_lei  string `json:"conditional_lei"`
	Conditional_noi  string `json:"conditional_noi"`
	Conditional_voi  string `json:"conditional_voi"`
	Conditional_loro string `json:"conditional_loro"`

	Present_Subjunctive_io   string `json:"present_subjunctive_io"`
	Present_Subjunctive_tu   string `json:"present_subjunctive_tu"`
	Present_Subjunctive_lei  string `json:"present_subjunctive_lei"`
	Present_Subjunctive_noi  string `json:"present_subjunctive_noi"`
	Present_Subjunctive_voi  string `json:"present_subjunctive_voi"`
	Present_Subjunctive_loro string `json:"present_subjunctive_loro"`

	Imperfect_Subjunctive_io   string `json:"imperfect_subjunctive_io"`
	Imperfect_Subjunctive_tu   string `json:"imperfect_subjunctive_tu"`
	Imperfect_Subjunctive_lei  string `json:"imperfect_subjunctive_lei"`
	Imperfect_Subjunctive_noi  string `json:"imperfect_subjunctive_noi"`
	Imperfect_Subjunctive_voi  string `json:"imperfect_subjunctive_voi"`
	Imperfect_Subjunctive_loro string `json:"imperfect_subjunctive_loro"`
}




