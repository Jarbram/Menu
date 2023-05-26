package services

import "menu/app/database"

type AdminService struct {
	AdminDB *database.AdminDatabase
}

func NewAdminService(adminDB *database.AdminDatabase) *AdminService {
	return &AdminService{
		AdminDB: adminDB,
	}
}

// Funciones relacionadas con la lógica de negocio para administradores
// Ejemplo: autenticación, agregar nuevo administrador, etc.
