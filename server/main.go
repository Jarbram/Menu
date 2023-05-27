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
	entradasDB := database.NewEntradasDatabase(db)
	fondosDB := database.NewFondosDatabase(db)
	postresDB := database.NewPostresDatabase(db)
	bebidasDB := database.NewBebidasDatabase(db)
	adminService := services.NewAdminService(adminDB)
	entradasService := services.NewEntradasService(entradasDB)
	fondosService := services.NewFondosService(fondosDB)
	postresService := services.NewPostresService(postresDB)
	bebidasService := services.NewBebidasService(bebidasDB)
	adminController := controllers.NewAdminController(adminService)
	entradasController := controllers.NewEntradasController(entradasService)
	fondosController := controllers.NewFondosController(fondosService)
	postresController := controllers.NewPostresController(postresService)
	bebidasController := controllers.NewBebidasController(bebidasService)

	// Configurar el enrutador Gin
	r := gin.Default()

	// Configurar rutas para la administración
	routes.SetupAdminRoutes(r, adminController)
	routes.SetupEntradasRoutes(r, entradasController)
	routes.SetupFondosRoutes(r, fondosController)
	routes.SetupPostresRoutes(r, postresController)
	routes.SetupBebidasRoutes(r, bebidasController)

	// Ejecutar el servidor
	r.Run(":8080") // Cambia el número de puerto según tus necesidades
}
