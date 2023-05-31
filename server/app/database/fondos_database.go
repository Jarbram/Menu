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

func (fd FondosDatabase) GetFondosComplete() ([]models.Fondos, error) {
	var fondos []models.Fondos
	rows, err := fd.DB.Query("SELECT * FROM fondos")
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

func (fd FondosDatabase) AddDish(fondos *models.Fondos) error {
	_, err := fd.DB.Exec("INSERT INTO fondos (nombre, precio, disponible, descripcion) VALUES (?, ?, ?, ?)", fondos.Nombre, fondos.Precio, fondos.Disponible, fondos.Descripcion)
	if err != nil {
		return err
	}
	return nil
}

func (fd FondosDatabase) DeleteDish(id string) error {
	_, err := fd.DB.Exec("DELETE FROM fondos WHERE id = ?", id)
	if err != nil {
		return err
	}
	return nil
}

func (fd FondosDatabase) UpdateDish(id string, fondos *models.Fondos) error {
	_, err := fd.DB.Exec("UPDATE fondos SET nombre = ?, precio = ?, disponible = ?, descripcion = ? WHERE id = ?", fondos.Nombre, fondos.Precio, fondos.Disponible, fondos.Descripcion, id)
	if err != nil {
		return err
	}
	return nil
}
