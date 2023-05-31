package services

import (
	"menu/app/database"
	"menu/app/models"
)

type PostresService struct {
	PostresDB *database.PostresDatabase
}

func NewPostresService(postresDB *database.PostresDatabase) *PostresService {
	return &PostresService{
		PostresDB: postresDB,
	}
}

func (ps *PostresService) GetPostres() ([]models.Postres, error) {
	return ps.PostresDB.GetPostres()
}

func (ps *PostresService) AddDish(postres *models.Postres) error {
	return ps.PostresDB.AddDish(postres)
}

func (ps *PostresService) DeleteDish(id string) error {
	return ps.PostresDB.DeleteDish(id)
}

func (ps *PostresService) UpdateDish(id string, postres *models.Postres) error {
	return ps.PostresDB.UpdateDish(id, postres)
}
