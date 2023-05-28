package database

import (
	"database/sql"
	"menu/app/models"
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

func (ed EntradasDatabase) GetEntradas() ([]models.Entradas, error) {
	var entradas []models.Entradas

	rows, err := ed.DB.Query("SELECT * FROM entradas WHERE disponible = 1")
	if err != nil {
		return entradas, err
	}
	defer rows.Close()

	for rows.Next() {
		var entrada models.Entradas
		err = rows.Scan(&entrada.ID, &entrada.Nombre, &entrada.Precio, &entrada.Disponible, &entrada.Descripcion)
		if err != nil {
			return entradas, err
		}
		entradas = append(entradas, entrada)
	}

	return entradas, nil
}

func (ed EntradasDatabase) AddDish(entrada *models.Entradas) error {
	_, err := ed.DB.Exec("INSERT INTO entradas (nombre, precio, disponible, descripcion) VALUES (?, ?, ?, ?)", entrada.Nombre, entrada.Precio, entrada.Disponible, entrada.Descripcion)
	if err != nil {
		return err
	}
	return nil
}

func (ed EntradasDatabase) DeleteDish(id string) error {
	_, err := ed.DB.Exec("DELETE FROM entradas WHERE id = ?", id)
	if err != nil {
		return err
	}
	return nil
}
