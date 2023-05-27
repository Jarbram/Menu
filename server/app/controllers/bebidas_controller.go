package controllers

import (
	"menu/app/services"

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
func (bc BebidasController) GetBebidas(c *gin.Context) {
	// Implementar
}
func (bc BebidasController) AddDish(c *gin.Context) {
	// Implementar
}
func (bc BebidasController) DeleteDish(c *gin.Context) {
	// Implementar
}
