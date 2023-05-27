package controllers

import (
	"menu/app/services"

	"github.com/gin-gonic/gin"
)

type EntradasController struct {
	EntradasService *services.EntradasService
}

func NewEntradasController(entradasService *services.EntradasService) *EntradasController {
	return &EntradasController{
		EntradasService: entradasService,
	}
}

func (ec EntradasController) GetMenu(c *gin.Context) {
	// Implementar
}
func (ec EntradasController) AddDish(c *gin.Context) {
	// Implementar
}
func (ec EntradasController) DeleteDish(c *gin.Context) {
	// Implementar
}
