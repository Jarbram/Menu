package controllers

import (
	"menu/app/services"

	"github.com/gin-gonic/gin"
)

type FondosController struct {
	FondosService *services.FondosService
}

func NewFondosController(fondosService *services.FondosService) *FondosController {
	return &FondosController{
		FondosService: fondosService,
	}
}
func (fc FondosController) GetFondos(c *gin.Context) {
	// Implementar
}
func (fc FondosController) AddDish(c *gin.Context) {
	// Implementar
}
func (fc FondosController) DeleteDish(c *gin.Context) {
	// Implementar
}
