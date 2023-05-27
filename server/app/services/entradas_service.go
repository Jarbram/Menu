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
