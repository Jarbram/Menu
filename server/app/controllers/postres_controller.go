package controllers

import (
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
	// Implementar
}
func (pc PostresController) DeleteDish(c *gin.Context) {
	// Implementar
}
