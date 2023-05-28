package database

import (
	"database/sql"
	"menu/app/models"
)

type PostresDatabase struct {
	DB *sql.DB
}

func NewPostresDatabase(db *sql.DB) *PostresDatabase {
	return &PostresDatabase{
		DB: db,
	}
}

func (pd PostresDatabase) GetPostres() ([]models.Postres, error) {
	var postres []models.Postres

	rows, err := pd.DB.Query("SELECT * FROM postres WHERE disponible = 1")
	if err != nil {
		return postres, err
	}
	defer rows.Close()

	for rows.Next() {
		var postre models.Postres
		err = rows.Scan(&postre.ID, &postre.Nombre, &postre.Precio, &postre.Disponible, &postre.Descripcion)
		if err != nil {
			return postres, err
		}
		postres = append(postres, postre)
	}

	return postres, nil
}

func (pd PostresDatabase) AddDish(postres *models.Postres) error {
	_, err := pd.DB.Exec("INSERT INTO postres (nombre, precio, disponible, descripcion) VALUES (?, ?, ?, ?)", postres.Nombre, postres.Precio, postres.Disponible, postres.Descripcion)
	if err != nil {
		return err
	}
	return nil
}

func (pd PostresDatabase) DeleteDish(id string) error {
	_, err := pd.DB.Exec("DELETE FROM postres WHERE id = ?", id)
	if err != nil {
		return err
	}
	return nil
}
