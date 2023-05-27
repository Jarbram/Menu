package services

import "menu/app/database"

type FondosService struct {
	FondosDB *database.FondosDatabase
}

func NewFondosService(fondosDB *database.FondosDatabase) *FondosService {
	return &FondosService{
		FondosDB: fondosDB,
	}
}
