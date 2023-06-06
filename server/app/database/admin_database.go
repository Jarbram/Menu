package database

import (
	"database/sql"
	"errors"
	"fmt"
	// Importa otros paquetes necesarios
)

type AdminDatabase struct {
	DB *sql.DB
}

func NewAdminDatabase(db *sql.DB) *AdminDatabase {
	return &AdminDatabase{
		DB: db,
	}
}

var ErrInvalidCredentials = errors.New("invalid credentials")

func (ad AdminDatabase) Login(username, password string) error {
	var result string
	err := ad.DB.QueryRow("SELECT username FROM admin WHERE username = ? AND password = ?", username, password).Scan(&result)
	if err != nil {
		if err == sql.ErrNoRows {
			fmt.Println("Invalid credentials")
			return ErrInvalidCredentials
		}
		fmt.Println("Database error:", err)
		return err
	}
	fmt.Println("Login successful")
	return nil
}
