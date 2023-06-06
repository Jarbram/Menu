package controllers

import (
	"errors"
	"fmt"
	"menu/app/models"
	"menu/app/services"

	"github.com/gin-gonic/gin"
)

type AdminController struct {
	AdminService *services.AdminService
}

func NewAdminController(adminService *services.AdminService) *AdminController {
	return &AdminController{
		AdminService: adminService,
	}
}

var ErrInvalidCredentials = errors.New("invalid credentials")

func (ac AdminController) Login(c *gin.Context) {
	var loginRequest models.Admin
	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		fmt.Println("Invalid request:", err)
		c.JSON(400, gin.H{
			"error": "invalid request",
		})
		return
	}
	if err := ac.AdminService.Login(loginRequest.Username, loginRequest.Password); err != nil {
		if err == ErrInvalidCredentials {
			fmt.Println("Invalid credentials")
			c.JSON(401, gin.H{
				"error": "invalid credentials",
			})
		} else {
			fmt.Println("Internal server error:", err)
			c.JSON(500, gin.H{
				"error": "internal server error",
			})
		}
		return
	}
	fmt.Println("Login successful")
	c.JSON(200, gin.H{
		"message": "logged in",
	})
}
