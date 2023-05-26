package models

type Menu struct {
	ID         int64  `json:"id"`
	Nombre     string `json:"nombre"`
	Precio     int    `json:"precio"`
	Disponible bool   `json:"disponible"`
}
