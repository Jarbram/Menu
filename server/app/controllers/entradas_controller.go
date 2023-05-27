package controllers

import (
	"menu/app/services"
	"net/http"

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

func (ec *EntradasController) GetEntradas(c *gin.Context) {
	entradas, err := ec.EntradasService.GetEntradas()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, entradas)
}

func (ec EntradasController) AddDish(c *gin.Context) {
	// Implementar
}
func (ec EntradasController) DeleteDish(c *gin.Context) {
	// Implementar
}
