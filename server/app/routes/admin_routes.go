package routes

import (
	"menu/app/controllers"

	"github.com/gin-gonic/gin"
)

func SetupAdminRoutes(r *gin.Engine, adminController *controllers.AdminController) {
	adminRoutes := r.Group("/admin")
	{
		adminRoutes.POST("/login", adminController.Login)
	}
}
