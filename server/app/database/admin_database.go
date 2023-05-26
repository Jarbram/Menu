package database

import (
	"database/sql"
	// Importa otros paquetes necesarios
)

type AdminDatabase struct {
	DB *sql.DB
}

func NewAdminDatabase(db *sql.DB) *AdminDatabase {
	return &AdminDatabase{
		DB: db,
	}
}

// Funciones para interactuar con la tabla "admin" en la base de datos
// Ejemplo: crear, obtener, eliminar registros de administrador
