package controllers

import (
	"menu/app/models"
	"menu/app/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type PostresController struct {
	PostresService *services.PostresService
}

func NewPostresController(postresService *services.PostresService) *PostresController {
	return &PostresController{
		PostresService: postresService,
	}
}

func (pc PostresController) GetPostres(c *gin.Context) {
	postres, err := pc.PostresService.GetPostres()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, postres)
}
func (pc PostresController) AddDish(c *gin.Context) {
	var postres models.Postres
	if err := c.ShouldBindJSON(&postres); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	err := pc.PostresService.AddDish(&postres)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, "Postre añadido correctamente")
}
func (pc PostresController) DeleteDish(c *gin.Context) {
	id := c.Param("id")
	err := pc.PostresService.DeleteDish(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, "Postre eliminado correctamente")
}
