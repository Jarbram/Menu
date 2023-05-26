package main

import (
	"menu/app/controllers"
	"menu/app/database"
	"menu/app/routes"
	"menu/app/services"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	// Configurar la conexión con la base de datos
	db, err := database.Connect() // Aquí debes implementar la función Connect() para establecer la conexión con tu base de datos
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// Crear instancias de los componentes del backend
	adminDB := database.NewAdminDatabase(db)
	menuDB := database.NewMenuDatabase(db)
	adminService := services.NewAdminService(adminDB)
	menuService := services.NewMenuService(menuDB)
	adminController := controllers.NewAdminController(adminService)
	menuController := controllers.NewMenuController(menuService)

	// Configurar el enrutador Gin
	r := gin.Default()

	// Configurar rutas para la administración
	routes.SetupAdminRoutes(r, adminController)
	routes.SetupMenuRoutes(r, menuController)

	// Ejecutar el servidor
	r.Run(":8080") // Cambia el número de puerto según tus necesidades
}
