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

func (bd BebidasDatabase) AddDish(bebidas *models.Bebidas) error {
	_, err := bd.DB.Exec("INSERT INTO bebidas (nombre, precio, disponible, descripcion, tieneAlcohol) VALUES (?, ?, ?, ?, ?)", bebidas.Nombre, bebidas.Precio, bebidas.Disponible, bebidas.Descripcion, bebidas.TieneAlcohol)
	if err != nil {
		return err
	}
	return nil
}

func (bd BebidasDatabase) DeleteDish(id string) error {
	_, err := bd.DB.Exec("DELETE FROM bebidas WHERE id = ?", id)
	if err != nil {
		return err
	}
	return nil
}

func (bd BebidasDatabase) UpdateDish(id string, bebidas *models.Bebidas) error {
	_, err := bd.DB.Exec("UPDATE bebidas SET nombre = ?, precio = ?, disponible = ?, descripcion = ?, tieneAlcohol = ? WHERE id = ?", bebidas.Nombre, bebidas.Precio, bebidas.Disponible, bebidas.Descripcion, bebidas.TieneAlcohol, id)
	if err != nil {
		return err
	}
	return nil
}
