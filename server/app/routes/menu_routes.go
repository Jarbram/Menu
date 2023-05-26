package routes

import (
	"menu/app/controllers"

	"github.com/gin-gonic/gin"
)

func SetupMenuRoutes(r *gin.Engine, menuController *controllers.MenuController) {
	menuRoutes := r.Group("/menu")
	{
		menuRoutes.GET("/", menuController.GetMenu)
		menuRoutes.POST("/add-dish", menuController.AddDish)
		menuRoutes.DELETE("/delete-dish/:id", menuController.DeleteDish)
		// ... otras rutas relacionadas con el menú
	}
}
