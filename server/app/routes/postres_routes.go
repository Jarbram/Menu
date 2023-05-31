package routes

import (
	"menu/app/controllers"

	"github.com/gin-gonic/gin"
)

func SetupPostresRoutes(r *gin.Engine, postresController *controllers.PostresController) {
	postresRoutes := r.Group("/postres")
	{
		postresRoutes.GET("/", postresController.GetPostres)
		postresRoutes.GET("/complete", postresController.GetPostresComplete)
		postresRoutes.POST("/add-dish", postresController.AddDish)
		postresRoutes.DELETE("/delete-dish/:id", postresController.DeleteDish)
		postresRoutes.PUT("/edit-dish/:id", postresController.UpdateDish)
	}
}
