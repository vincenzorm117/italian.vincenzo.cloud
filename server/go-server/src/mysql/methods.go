package mysql

import (
	"database/sql"
	"fmt"
	"reflect"
	"sort"
	c "src/core"
	"strconv"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/graphql/language/ast"
)

var VerbFields = []string{ "Conditional_io","Conditional_lei","Conditional_loro","Conditional_noi","Conditional_tu","Conditional_voi","English","Future_io","Future_lei","Future_loro","Future_noi","Future_tu","Future_voi","Gerund_Present","Id","Imperative_io","Imperative_lei","Imperative_loro","Imperative_noi","Imperative_tu","Imperative_voi","Imperfect_Subjunctive_io","Imperfect_Subjunctive_lei","Imperfect_Subjunctive_loro","Imperfect_Subjunctive_noi","Imperfect_Subjunctive_tu","Imperfect_Subjunctive_voi","Imperfect_io","Imperfect_lei","Imperfect_loro","Imperfect_noi","Imperfect_tu","Imperfect_voi","Infinitive","Participle_Past","Past_io","Past_lei","Past_loro","Past_noi","Past_tu","Past_voi","Present_Subjunctive_io","Present_Subjunctive_lei","Present_Subjunctive_loro","Present_Subjunctive_noi","Present_Subjunctive_tu","Present_Subjunctive_voi","Present_io","Present_lei","Present_loro","Present_noi","Present_tu","Present_voi",
}

type WhereClause struct {
	query string
	params []interface{}
}


// func ScanVerb(rows *sql.Rows) (c.Verb, error) {
// 	var v c.Verb
// 	err := rows.Scan(
// 		&v.Id,
// 		&v.English,
// 		&v.Infinitive,
// 		&v.Participle_Past,
// 		&v.Gerund_Present,
		
// 		&v.Present_io,
// 		&v.Present_tu,
// 		&v.Present_lei,
// 		&v.Present_noi,
// 		&v.Present_voi,
// 		&v.Present_loro,
		
// 		&v.Imperfect_io,
// 		&v.Imperfect_tu,
// 		&v.Imperfect_lei,
// 		&v.Imperfect_noi,
// 		&v.Imperfect_voi,
// 		&v.Imperfect_loro,
		
// 		&v.Future_io,
// 		&v.Future_tu,
// 		&v.Future_lei,
// 		&v.Future_noi,
// 		&v.Future_voi,
// 		&v.Future_loro,
		
// 		&v.Past_io,
// 		&v.Past_tu,
// 		&v.Past_lei,
// 		&v.Past_noi,
// 		&v.Past_voi,
// 		&v.Past_loro,
		
// 		&v.Imperative_io,
// 		&v.Imperative_tu,
// 		&v.Imperative_lei,
// 		&v.Imperative_noi,
// 		&v.Imperative_voi,
// 		&v.Imperative_loro,
		
// 		&v.Conditional_io,
// 		&v.Conditional_tu,
// 		&v.Conditional_lei,
// 		&v.Conditional_noi,
// 		&v.Conditional_voi,
// 		&v.Conditional_loro,
		
// 		&v.Present_Subjunctive_io,
// 		&v.Present_Subjunctive_tu,
// 		&v.Present_Subjunctive_lei,
// 		&v.Present_Subjunctive_noi,
// 		&v.Present_Subjunctive_voi,
// 		&v.Present_Subjunctive_loro,
		
// 		&v.Imperfect_Subjunctive_io,
// 		&v.Imperfect_Subjunctive_tu,
// 		&v.Imperfect_Subjunctive_lei,
// 		&v.Imperfect_Subjunctive_noi,
// 		&v.Imperfect_Subjunctive_voi,
// 		&v.Imperfect_Subjunctive_loro,
// 	);
// 	return v, err
// }

func ScanVerb(rows *sql.Rows, fields *[]string) (c.Verb, error) {
	var v c.Verb
	
	columns, _ := rows.Columns()

	rowFields := make([]interface{}, len(columns))
	values := make([]interface{}, len(columns))
	
	for i := range columns {
		rowFields[i] = &values[i]
	}

	err := rows.Scan(rowFields...)

	for i := range columns {
		key := columns[i]

		r := reflect.ValueOf(&v)

		if key == "Id" {
			f := reflect.Indirect(r).FieldByName("Id")
			x := values[i].(int64)
			f.SetInt(int64(x))
		} else {
			f := reflect.Indirect(r).FieldByName(key)
			x := values[i].([]uint8)
			v := string(x)
			f.SetString(v)
		}		
	}

	return v, err
}


func SearchVerbs(ctx c.Ctx, p graphql.ResolveParams) (*[]c.Verb, error) {
	// id, ok := p.Args["id"].(int)
	// if ok {
	// 	return SearchVerbsWithId(ctx, id)
	// }

	// infinitive, ok := p.Args["infinitive"].(string)
	// if ok {
	// 	return SearchVerbsWithInfinitive(ctx, infinitive)
	// }

	// searchTerm, ok := p.Args["searchTerm"].(string)
	// if ok {
	// 	return SearchVerbsWithSearchTerm(ctx, searchTerm)
	// }

	fields := ConstructSelection(p)
	whereClause := ContructWhereClause(p)
	query := fmt.Sprintf("select %s from Verbs", strings.Join(*fields, ", "))
	query += whereClause.query

	fmt.Println(query)

	verbs := make([]c.Verb, 0)
	// perform a db.Query insert
	rows, err := ctx.Db.Query(query, whereClause.params...)

	// if there is an error resultsing, handle it
	if err != nil {
		return nil, err
	}
	// be careful deferring Queries if you are using transactions
	defer rows.Close()

	for rows.Next() {
		//verb := c.Verb{}
		// err = rows.Scan(&verb)
		verb, err := ScanVerb(rows, fields)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		verbs = append(verbs, verb)
	}
	return &verbs, nil
}

func ConstructSelection(p graphql.ResolveParams) *[]string {
	if p.Info.FieldASTs == nil {
		return &[]string{}
	}

	fields := make([]string, 0)
	for _, fieldAST := range p.Info.FieldASTs {
		if fieldAST.SelectionSet == nil {
			continue
		}
		for _, sel := range fieldAST.SelectionSet.Selections {
			field, ok := sel.(*ast.Field)
			if ok {
				index := sort.SearchStrings(VerbFields, field.Name.Value)
				if 0 <= index && index < len(VerbFields) { 
					fields = append(fields, field.Name.Value)
				}
			}
		}
	}
	return &fields
}

func ContructWhereClause(p graphql.ResolveParams) WhereClause {
	id, ok := p.Args["id"].(int)
	if ok {
		params := make([]interface{}, 1)
		foo := []byte(strconv.Itoa(id))
		params[0] = foo
		return WhereClause{
			query: " WHERE id = ?",
			params: params,
		}
	}

	infinitive, ok := p.Args["infinitive"].(string)
	if ok {
		params := make([]interface{}, 1)
		params[0] = infinitive
		return WhereClause{
			query: " WHERE id = ?",
			params: params,
		}
	}

	return WhereClause{
		query: "",
		params: make([]interface{}, 0),
	}
}


// func SearchVerbsWithId(ctx c.Ctx, id int) (*[]c.Verb, error) {

// 	verbs := make([]c.Verb, 0)
// 	// perform a db.Query insert
// 	rows, err := ctx.Db.Query("select * from Verbs where Id = ?", id)

// 	// if there is an error resultsing, handle it
// 	if err != nil {
// 		return nil, err
// 	}
// 	// be careful deferring Queries if you are using transactions
// 	defer rows.Close()

// 	for rows.Next() {
// 		//verb := c.Verb{}
// 		// err = rows.Scan(&verb)
// 		verb, err := ScanVerb(rows)
// 		if err != nil {
// 			panic(err.Error()) // proper error handling instead of panic in your app
// 		}
// 		verbs = append(verbs, verb)
// 	}
// 	return &verbs, nil
// }


// func SearchVerbsWithInfinitive(ctx c.Ctx, infinitive string) (*[]c.Verb, error) {

// 	verbs := make([]c.Verb, 0)
// 	// perform a db.Query insert
// 	rows, err := ctx.Db.Query("select * from Verbs where Infinitive = ?", infinitive)

// 	// if there is an error resultsing, handle it
// 	if err != nil {
// 		return nil, err
// 	}
// 	// be careful deferring Queries if you are using transactions
// 	defer rows.Close()

// 	for rows.Next() {
// 		//verb := c.Verb{}
// 		// err = rows.Scan(&verb)
// 		verb, err := ScanVerb(rows)
// 		if err != nil {
// 			panic(err.Error()) // proper error handling instead of panic in your app
// 		}
// 		verbs = append(verbs, verb)
// 	}
// 	return &verbs, nil
// }


// func SearchVerbsWithSearchTerm(ctx c.Ctx, searchTerm string) (*[]c.Verb, error) {

// 	// perform a db.Query insert
// 	rows, err := ctx.Db.Query("select * from Verbs where Id = ?", searchTerm)

// 	// if there is an error resultsing, handle it
// 	if err != nil {
// 		return nil, err
// 	}
// 	// be careful deferring Queries if you are using transactions
// 	defer rows.Close()

// 	for rows.Next() {
// 		//verb := c.Verb{}
// 		// err = rows.Scan(&verb)
// 		verb, err := ScanVerb(rows)
// 		if err != nil {
// 			panic(err.Error()) // proper error handling instead of panic in your app
// 		}
// 		return &verb, nil
// 	}
// 	return nil, nil
// }


// func GetAllVerbs(ctx c.Ctx, searchTerm string) (*[]c.Verb, error) {

// 	// perform a db.Query insert
// 	rows, err := ctx.Db.Query("select * from Verbs where Id = ?", searchTerm)

// 	// if there is an error resultsing, handle it
// 	if err != nil {
// 		return nil, err
// 	}
// 	// be careful deferring Queries if you are using transactions
// 	defer rows.Close()

// 	for rows.Next() {
// 		//verb := c.Verb{}
// 		// err = rows.Scan(&verb)
// 		verb, err := ScanVerb(rows)
// 		if err != nil {
// 			panic(err.Error()) // proper error handling instead of panic in your app
// 		}
// 		return &verb, nil
// 	}
// 	return nil, nil
// }
