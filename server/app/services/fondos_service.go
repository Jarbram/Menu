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
