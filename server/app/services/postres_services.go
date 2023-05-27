package services

import "menu/app/database"

type PostresService struct {
	PostresDB *database.PostresDatabase
}

func NewPostresService(postresDB *database.PostresDatabase) *PostresService {
	return &PostresService{
		PostresDB: postresDB,
	}
}
