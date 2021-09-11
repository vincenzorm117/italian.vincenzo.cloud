package mysql

import (
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func Open() *sql.DB {
	db, err := sql.Open("mysql", "root:1234@tcp(127.0.0.1:4406)/languages")

	if err != nil {
		panic(err.Error())
	}

	return db
}
