package services

import (
	"menu/app/database"
	"menu/app/models"
)

type BebidasService struct {
	BebidasDB *database.BebidasDatabase
}

func NewBebidasService(bebidasDB *database.BebidasDatabase) *BebidasService {
	return &BebidasService{
		BebidasDB: bebidasDB,
	}
}

func (bs *BebidasService) GetBebidas() ([]models.Bebidas, error) {
	return bs.BebidasDB.GetBebidas()
}
