package services

import (
	"menu/app/database"
	"menu/app/models"
)

type FondosService struct {
	FondosDB *database.FondosDatabase
}

func NewFondosService(fondosDB *database.FondosDatabase) *FondosService {
	return &FondosService{
		FondosDB: fondosDB,
	}
}

func (fs *FondosService) GetFondos() ([]models.Fondos, error) {
	return fs.FondosDB.GetFondos()
}

func (fs *FondosService) GetFondosComplete() ([]models.Fondos, error) {
	return fs.FondosDB.GetFondosComplete()
}

func (fs *FondosService) AddDish(fondos *models.Fondos) error {
	return fs.FondosDB.AddDish(fondos)
}

func (fs *FondosService) DeleteDish(id string) error {
	return fs.FondosDB.DeleteDish(id)
}

func (fs *FondosService) UpdateDish(id string, fondos *models.Fondos) error {
	return fs.FondosDB.UpdateDish(id, fondos)
}
