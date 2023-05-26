package controllers

import (
	"menu/app/services"

	"github.com/gin-gonic/gin"
)

type MenuController struct {
	MenuService *services.MenuService
}

func NewMenuController(menuService *services.MenuService) *MenuController {
	return &MenuController{
		MenuService: menuService,
	}
}

func (mc MenuController) GetMenu(c *gin.Context) {
	// Implementar
}
func (mc MenuController) AddDish(c *gin.Context) {
	// Implementar
}
func (mc MenuController) DeleteDish(c *gin.Context) {
	// Implementar
}
