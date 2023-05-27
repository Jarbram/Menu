package services

import "menu/app/database"

type BebidasService struct {
	BebidasDB *database.BebidasDatabase
}

func NewBebidasService(bebidasDB *database.BebidasDatabase) *BebidasService {
	return &BebidasService{
		BebidasDB: bebidasDB,
	}
}
