package controllers

import (
	"menu/app/models"
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

func (bc *BebidasController) GetBebidasComplete(c *gin.Context) {
	bebidas, err := bc.BebidasService.GetBebidasComplete()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, bebidas)
}

func (bc BebidasController) AddDish(c *gin.Context) {
	var bebidas models.Bebidas
	if err := c.ShouldBindJSON(&bebidas); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := bc.BebidasService.AddDish(&bebidas)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, "Bebida añadida correctamente")
}
func (bc BebidasController) DeleteDish(c *gin.Context) {
	id := c.Param("id")
	err := bc.BebidasService.DeleteDish(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, "Bebida eliminada correctamente")
}

func (bc BebidasController) UpdateDish(c *gin.Context) {
	id := c.Param("id")
	var bebidas models.Bebidas
	if err := c.ShouldBindJSON(&bebidas); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := bc.BebidasService.UpdateDish(id, &bebidas)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, "Bebida actualizada correctamente")
}
