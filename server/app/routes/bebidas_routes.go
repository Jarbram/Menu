package routes

import (
	"menu/app/controllers"

	"github.com/gin-gonic/gin"
)

func SetupBebidasRoutes(r *gin.Engine, bebidasController *controllers.BebidasController) {
	bebidasRoutes := r.Group("/bebidas")
	{
		bebidasRoutes.GET("/", bebidasController.GetBebidas)
		bebidasRoutes.POST("/add-dish", bebidasController.AddDish)
		bebidasRoutes.DELETE("/delete-dish/:id", bebidasController.DeleteDish)
		bebidasRoutes.PUT("/edit-dish/:id", bebidasController.UpdateDish)
	}
}
