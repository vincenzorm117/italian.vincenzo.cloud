package graphql

import (
	c "src/core"

	"github.com/graphql-go/graphql"
)

func New(ctx c.Ctx) graphql.Schema {
	fields := graphql.Fields{
		"verbs": FieldVerbs(ctx),
	}

	rootQuery := graphql.ObjectConfig{
		Name:   "RootQuery",
		Fields: fields,
	}

	schemaConfig := graphql.SchemaConfig{Query: graphql.NewObject(rootQuery)}
	schema, _ := graphql.NewSchema(schemaConfig)
	return schema
}
