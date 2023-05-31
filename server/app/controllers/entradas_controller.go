package controllers

import (
	"menu/app/models"
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
	var entradas models.Entradas
	if err := c.ShouldBindJSON(&entradas); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := ec.EntradasService.AddDish(&entradas)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, "Entrada añadida correctamente")
}
func (ec EntradasController) DeleteDish(c *gin.Context) {
	id := c.Param("id")
	err := ec.EntradasService.DeleteDish(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, "Entrada eliminada correctamente")
}

func (ec EntradasController) UpdateDish(c *gin.Context) {
	id := c.Param("id")
	var entradas models.Entradas
	if err := c.ShouldBindJSON(&entradas); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := ec.EntradasService.UpdateDish(id, &entradas)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusOK, "Entrada actualizada correctamente")
}
