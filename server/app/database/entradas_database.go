package database

import (
	"database/sql"
	// Importa otros paquetes necesarios
)

type EntradasDatabase struct {
	DB *sql.DB
}

func NewEntradasDatabase(db *sql.DB) *EntradasDatabase {
	return &EntradasDatabase{
		DB: db,
	}
}

// Funciones para interactuar con la tabla "menu" en la base de datos
// Ejemplo: crear, obtener, eliminar platos del menú
