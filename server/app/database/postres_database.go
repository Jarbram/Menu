package database

import "database/sql"

type PostresDatabase struct {
	DB *sql.DB
}

func NewPostresDatabase(db *sql.DB) *PostresDatabase {
	return &PostresDatabase{
		DB: db,
	}
}
