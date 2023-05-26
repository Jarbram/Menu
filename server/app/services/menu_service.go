package services

import "menu/app/database"

type MenuService struct {
	MenuDB *database.MenuDatabase
}

func NewMenuService(menuDB *database.MenuDatabase) *MenuService {
	return &MenuService{
		MenuDB: menuDB,
	}
}
