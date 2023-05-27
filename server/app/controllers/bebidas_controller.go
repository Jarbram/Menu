package controllers

import (
	"menu/app/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type BebidasController struct {
	BebidasService *services.BebidasService
}

func NewBebidasController(bebidasService *services.BebidasService) *BebidasController {
	return &BebidasController{
		BebidasService: bebidasService,
	}
}
func (bc *BebidasController) GetBebidas(c *gin.Context) {
	bebidas, err := bc.BebidasService.GetBebidas()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, bebidas)
}
func (bc BebidasController) AddDish(c *gin.Context) {
	// Implementar
}
func (bc BebidasController) DeleteDish(c *gin.Context) {
	// Implementar
}
