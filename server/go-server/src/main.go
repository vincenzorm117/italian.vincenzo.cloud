package main

import (
	"log"
	"net/http"
	c "src/core"
	gql "src/graphql"
	mysql "src/mysql"

	"github.com/graphql-go/handler"
)

func main() {
	db := mysql.Open()
	defer db.Close()

	ctx := c.Ctx{
		Db: db,
	}

	schema := gql.New(ctx)

	h := handler.New(&handler.Config{
		Schema:   &schema,
		Pretty:   true,
		GraphiQL: true,
	})

	http.Handle("/graphql", h)

	log.Fatal(http.ListenAndServe(":8081", nil))
}