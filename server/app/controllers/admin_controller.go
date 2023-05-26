package controllers

import (
	"menu/app/services"

	"github.com/gin-gonic/gin"
)

type AdminController struct {
	AdminService *services.AdminService
}

func NewAdminController(adminService *services.AdminService) *AdminController {
	return &AdminController{
		AdminService: adminService,
	}
}
func (ac AdminController) Login(c *gin.Context) {
	// Implementar
}
func (ac AdminController) Register(c *gin.Context) {
	// Implementar
}
