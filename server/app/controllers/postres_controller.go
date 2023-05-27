package controllers

import (
	"menu/app/services"

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
	// Implementar
}
func (pc PostresController) AddDish(c *gin.Context) {
	// Implementar
}
func (pc PostresController) DeleteDish(c *gin.Context) {
	// Implementar
}
