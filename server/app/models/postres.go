package models

type Postres struct {
	ID          int64  `json:"id"`
	Nombre      string `json:"nombre"`
	Precio      int    `json:"precio"`
	Disponible  bool   `json:"disponible"`
	Descripcion string `json:"descripcion"`
}
