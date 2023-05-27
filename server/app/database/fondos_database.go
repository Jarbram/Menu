package database

import "database/sql"

type FondosDatabase struct {
	DB *sql.DB
}

func NewFondosDatabase(db *sql.DB) *FondosDatabase {
	return &FondosDatabase{
		DB: db,
	}
}
