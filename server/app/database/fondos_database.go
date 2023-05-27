package database

import (
	"database/sql"
	"menu/app/models"
)

type FondosDatabase struct {
	DB *sql.DB
}

func NewFondosDatabase(db *sql.DB) *FondosDatabase {
	return &FondosDatabase{
		DB: db,
	}
}

func (fd FondosDatabase) GetFondos() ([]models.Fondos, error) {
	var fondos []models.Fondos

	rows, err := fd.DB.Query("SELECT * FROM fondos WHERE disponible = 1")
	if err != nil {
		return fondos, err
	}
	defer rows.Close()

	for rows.Next() {
		var fondo models.Fondos
		err = rows.Scan(&fondo.ID, &fondo.Nombre, &fondo.Precio, &fondo.Disponible, &fondo.Descripcion)
		if err != nil {
			return fondos, err
		}
		fondos = append(fondos, fondo)
	}

	return fondos, nil
}
