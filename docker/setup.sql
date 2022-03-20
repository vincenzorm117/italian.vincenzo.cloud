
CREATE DATABASE languages;

USE languages;


CREATE TABLE Verbs (
    id int primary key auto_increment,
    English varchar(50),
  	Infinitive varchar(50),
    Participle_Past varchar(50),
    Gerund_Present varchar(50),
  	
    Present_io varchar(50),
	  Present_tu varchar(50),
    Present_lei varchar(50),
    Present_noi varchar(50),
    Present_voi varchar(50),
    Present_loro varchar(50),
    
    Imperfect_io varchar(50),
	  Imperfect_tu varchar(50),
    Imperfect_lei varchar(50),
    Imperfect_noi varchar(50),
    Imperfect_voi varchar(50),
    Imperfect_loro varchar(50),
    
    Future_io varchar(50),
	  Future_tu varchar(50),
    Future_lei varchar(50),
    Future_noi varchar(50),
    Future_voi varchar(50),
    Future_loro varchar(50),
    
    Past_io varchar(50),
	  Past_tu varchar(50),
    Past_lei varchar(50),
    Past_noi varchar(50),
    Past_voi varchar(50),
    Past_loro varchar(50),
    
    Imperative_io varchar(50),
	  Imperative_tu varchar(50),
    Imperative_lei varchar(50),
    Imperative_noi varchar(50),
    Imperative_voi varchar(50),
    Imperative_loro varchar(50),
    
    Conditional_io varchar(50),
	  Conditional_tu varchar(50),
    Conditional_lei varchar(50),
    Conditional_noi varchar(50),
    Conditional_voi varchar(50),
    Conditional_loro varchar(50),
    
    Present_Subjunctive_io varchar(50),
	  Present_Subjunctive_tu varchar(50),
    Present_Subjunctive_lei varchar(50),
    Present_Subjunctive_noi varchar(50),
    Present_Subjunctive_voi varchar(50),
    Present_Subjunctive_loro varchar(50),
    
    Imperfect_Subjunctive_io varchar(50),
	  Imperfect_Subjunctive_tu varchar(50),
    Imperfect_Subjunctive_lei varchar(50),
    Imperfect_Subjunctive_noi varchar(50),
    Imperfect_Subjunctive_voi varchar(50),
    Imperfect_Subjunctive_loro varchar(50)
);


CREATE TABLE Nouns (
    id int primary key auto_increment,
    English_Singular varchar(50),
    English_Plural varchar(50),
    Italian_Singular varchar(50),
    Italian_Plural varchar(50)
);


CREATE TABLE Adjectives (
    id int primary key auto_increment,
    English_Singular varchar(50),
    English_Plural varchar(50),
    Italian_Singular_FEM varchar(50),
    Italian_Plural_FEM varchar(50),
    Italian_Singular_MAS varchar(50),
    Italian_Plural_MAS varchar(50)
);

CREATE TABLE Adverbs (
    id int primary key auto_increment,
    English varchar(50),
    Italian varchar(50)
);





-- SET global general_log = 1;
-- SET global log_output = 'table';