package database

import "database/sql"

type BebidasDatabase struct {
	DB *sql.DB
}

func NewBebidasDatabase(db *sql.DB) *BebidasDatabase {
	return &BebidasDatabase{
		DB: db,
	}
}
