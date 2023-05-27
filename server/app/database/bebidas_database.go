package database

import (
	"database/sql"
	"menu/app/models"
)

type BebidasDatabase struct {
	DB *sql.DB
}

func NewBebidasDatabase(db *sql.DB) *BebidasDatabase {
	return &BebidasDatabase{
		DB: db,
	}
}

func (bd BebidasDatabase) GetBebidas() ([]models.Bebidas, error) {
	var bebidas []models.Bebidas

	rows, err := bd.DB.Query("SELECT * FROM bebidas WHERE disponible = 1")
	if err != nil {
		return bebidas, err
	}
	defer rows.Close()

	for rows.Next() {
		var bebida models.Bebidas
		err = rows.Scan(&bebida.ID, &bebida.Nombre, &bebida.Precio, &bebida.Disponible, &bebida.Descripcion, &bebida.TieneAlcohol)
		if err != nil {
			return bebidas, err
		}
		bebidas = append(bebidas, bebida)
	}

	return bebidas, nil
}
