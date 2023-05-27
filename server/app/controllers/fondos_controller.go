package controllers

import (
	"menu/app/services"
	"net/http"

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
	fondos, err := fc.FondosService.GetFondos()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, fondos)

}
func (fc FondosController) AddDish(c *gin.Context) {
	// Implementar
}
func (fc FondosController) DeleteDish(c *gin.Context) {
	// Implementar
}
