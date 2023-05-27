package routes

import (
	"menu/app/controllers"

	"github.com/gin-gonic/gin"
)

func SetupEntradasRoutes(r *gin.Engine, entradasController *controllers.EntradasController) {
	entradasRoutes := r.Group("/menu")
	{
		entradasRoutes.GET("/", entradasController.GetMenu)
		entradasRoutes.POST("/add-dish", entradasController.AddDish)
		entradasRoutes.DELETE("/delete-dish/:id", entradasController.DeleteDish)
		// ... otras rutas relacionadas con el menú
	}
}
