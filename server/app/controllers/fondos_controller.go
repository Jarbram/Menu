package controllers

import (
	"menu/app/models"
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
	var fondos models.Fondos
	if err := c.ShouldBindJSON(&fondos); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := fc.FondosService.AddDish(&fondos)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, "Fondo añadido correctamente")
}
func (fc FondosController) DeleteDish(c *gin.Context) {
	id := c.Param("id")
	err := fc.FondosService.DeleteDish(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, "Fondo eliminado correctamente")
}
