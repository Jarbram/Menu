package services

import (
	"fmt"
	"menu/app/database"
)

type AdminService struct {
	AdminDB *database.AdminDatabase
}

func NewAdminService(adminDB *database.AdminDatabase) *AdminService {
	return &AdminService{
		AdminDB: adminDB,
	}
}

func (as AdminService) Login(username, password string) error {
	err := as.AdminDB.Login(username, password)
	if err != nil {
		fmt.Println("Login error:", err)
	} else {
		fmt.Println("Login successful")
	}
	return err
}
