package database

import (
	"database/sql"
	"log"
)

func Connect() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "menu.db") // Reemplaza "menu.db" con el nombre y ubicación de tu archivo de base de datos
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	err = db.Ping()
	if err != nil {
		log.Fatal(err)
		return nil, err
	}

	return db, nil
}
