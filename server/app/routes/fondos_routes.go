package routes

import (
	"menu/app/controllers"

	"github.com/gin-gonic/gin"
)

func SetupFondosRoutes(r *gin.Engine, fondosController *controllers.FondosController) {
	fondosRoutes := r.Group("/fondos")
	{
		fondosRoutes.GET("/", fondosController.GetFondos)
		fondosRoutes.GET("/complete", fondosController.GetFondosComplete)
		fondosRoutes.POST("/add-dish", fondosController.AddDish)
		fondosRoutes.DELETE("/delete-dish/:id", fondosController.DeleteDish)
		fondosRoutes.PUT("/edit-dish/:id", fondosController.UpdateDish)
	}
}
