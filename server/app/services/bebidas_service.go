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

func (bs *BebidasService) AddDish(bebidas *models.Bebidas) error {
	return bs.BebidasDB.AddDish(bebidas)
}

func (bs *BebidasService) DeleteDish(id string) error {
	return bs.BebidasDB.DeleteDish(id)
}

func (bs *BebidasService) UpdateDish(id string, bebidas *models.Bebidas) error {
	return bs.BebidasDB.UpdateDish(id, bebidas)
}
