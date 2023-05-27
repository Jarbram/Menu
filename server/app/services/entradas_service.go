package services

import "menu/app/database"

type EntradasService struct {
	EntradasDB *database.EntradasDatabase
}

func NewEntradasService(entradasDB *database.EntradasDatabase) *EntradasService {
	return &EntradasService{
		EntradasDB: entradasDB,
	}
}
