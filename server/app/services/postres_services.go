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
