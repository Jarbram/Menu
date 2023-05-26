package database

import (
	"database/sql"
	// Importa otros paquetes necesarios
)

type MenuDatabase struct {
	DB *sql.DB
}

func NewMenuDatabase(db *sql.DB) *MenuDatabase {
	return &MenuDatabase{
		DB: db,
	}
}

// Funciones para interactuar con la tabla "menu" en la base de datos
// Ejemplo: crear, obtener, eliminar platos del menú
