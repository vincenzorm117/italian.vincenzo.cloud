package graphql

import (
	c "src/core"
	mysql "src/mysql"

	"github.com/graphql-go/graphql"
)

// func Hello() *graphql.Field {
// 	return &graphql.Field{
// 		Type: graphql.String,
// 		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
// 			return "world", nil
// 		},
// 	}
// }

func FieldVerbs(ctx c.Ctx) *graphql.Field {
	var verbType = graphql.NewObject(graphql.ObjectConfig{
		Name: "verbs",
		Fields: graphql.Fields{
			"Id":                         &graphql.Field{Type: graphql.Int},
			"Infinitive":            &graphql.Field{Type: graphql.String},
			"Participle_Past":            &graphql.Field{Type: graphql.String},
			"Gerund_Present":             &graphql.Field{Type: graphql.String},
			"English":                    &graphql.Field{Type: graphql.String},
			"Present_io":                 &graphql.Field{Type: graphql.String},
			"Present_tu":                 &graphql.Field{Type: graphql.String},
			"Present_lei":                &graphql.Field{Type: graphql.String},
			"Present_noi":                &graphql.Field{Type: graphql.String},
			"Present_voi":                &graphql.Field{Type: graphql.String},
			"Present_loro":               &graphql.Field{Type: graphql.String},
			"Imperfect_io":               &graphql.Field{Type: graphql.String},
			"Imperfect_tu":               &graphql.Field{Type: graphql.String},
			"Imperfect_lei":              &graphql.Field{Type: graphql.String},
			"Imperfect_noi":              &graphql.Field{Type: graphql.String},
			"Imperfect_voi":              &graphql.Field{Type: graphql.String},
			"Imperfect_loro":             &graphql.Field{Type: graphql.String},
			"Future_io":                  &graphql.Field{Type: graphql.String},
			"Future_tu":                  &graphql.Field{Type: graphql.String},
			"Future_lei":                 &graphql.Field{Type: graphql.String},
			"Future_noi":                 &graphql.Field{Type: graphql.String},
			"Future_voi":                 &graphql.Field{Type: graphql.String},
			"Future_loro":                &graphql.Field{Type: graphql.String},
			"Past_io":                    &graphql.Field{Type: graphql.String},
			"Past_tu":                    &graphql.Field{Type: graphql.String},
			"Past_lei":                   &graphql.Field{Type: graphql.String},
			"Past_noi":                   &graphql.Field{Type: graphql.String},
			"Past_voi":                   &graphql.Field{Type: graphql.String},
			"Past_loro":                  &graphql.Field{Type: graphql.String},
			"Imperative_io":              &graphql.Field{Type: graphql.String},
			"Imperative_tu":              &graphql.Field{Type: graphql.String},
			"Imperative_lei":             &graphql.Field{Type: graphql.String},
			"Imperative_noi":             &graphql.Field{Type: graphql.String},
			"Imperative_voi":             &graphql.Field{Type: graphql.String},
			"Imperative_loro":            &graphql.Field{Type: graphql.String},
			"Conditional_io":             &graphql.Field{Type: graphql.String},
			"Conditional_tu":             &graphql.Field{Type: graphql.String},
			"Conditional_lei":            &graphql.Field{Type: graphql.String},
			"Conditional_noi":            &graphql.Field{Type: graphql.String},
			"Conditional_voi":            &graphql.Field{Type: graphql.String},
			"Conditional_loro":           &graphql.Field{Type: graphql.String},
			"Present_Subjunctive_io":     &graphql.Field{Type: graphql.String},
			"Present_Subjunctive_tu":     &graphql.Field{Type: graphql.String},
			"Present_Subjunctive_lei":    &graphql.Field{Type: graphql.String},
			"Present_Subjunctive_noi":    &graphql.Field{Type: graphql.String},
			"Present_Subjunctive_voi":    &graphql.Field{Type: graphql.String},
			"Present_Subjunctive_loro":   &graphql.Field{Type: graphql.String},
			"Imperfect_Subjunctive_io":   &graphql.Field{Type: graphql.String},
			"Imperfect_Subjunctive_tu":   &graphql.Field{Type: graphql.String},
			"Imperfect_Subjunctive_lei":  &graphql.Field{Type: graphql.String},
			"Imperfect_Subjunctive_noi":  &graphql.Field{Type: graphql.String},
			"Imperfect_Subjunctive_voi":  &graphql.Field{Type: graphql.String},
			"Imperfect_Subjunctive_loro": &graphql.Field{Type: graphql.String},
		},
	})

	return &graphql.Field{
		Type: graphql.NewList(verbType),
		Args: graphql.FieldConfigArgument{
			"id": &graphql.ArgumentConfig{
				Type:         graphql.Int,
				DefaultValue: nil,
			},
			"infinitive": &graphql.ArgumentConfig{
				Type:         graphql.String,
				DefaultValue: nil,
			},
			"searchTerm": &graphql.ArgumentConfig{
				Type:         graphql.String,
				DefaultValue: nil,
			},
		},
		Resolve: func(p graphql.ResolveParams) (interface{}, error) {
			return mysql.SearchVerbs(ctx, p)
		},
	}
}
