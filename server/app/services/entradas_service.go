package services

import (
	"menu/app/database"
	"menu/app/models"
)

type EntradasService struct {
	EntradasDB *database.EntradasDatabase
}

func NewEntradasService(entradasDB *database.EntradasDatabase) *EntradasService {
	return &EntradasService{
		EntradasDB: entradasDB,
	}
}

func (es *EntradasService) GetEntradas() ([]models.Entradas, error) {
	return es.EntradasDB.GetEntradas()
}

func (es *EntradasService) GetEntradasComplete() ([]models.Entradas, error) {
	return es.EntradasDB.GetEntradasComplete()
}

func (es *EntradasService) AddDish(entrada *models.Entradas) error {
	return es.EntradasDB.AddDish(entrada)
}

func (es *EntradasService) DeleteDish(id string) error {
	return es.EntradasDB.DeleteDish(id)
}

func (es *EntradasService) UpdateDish(id string, entrada *models.Entradas) error {
	return es.EntradasDB.UpdateDish(id, entrada)
}
