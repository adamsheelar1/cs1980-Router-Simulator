package main

import (
	"github.com/gin-gonic/gin"
)

func main() {

	router := gin.Default()

	router.GET("/getClients", getClients)
	router.GET("/getClients/:Client", getClientsByName)
	router.POST("/addClient", addClient)
	router.POST("/updateClientData", updateClientData)
	router.DELETE("/deleteClient", deleteClient)
	router.POST("/runSimulation", runSimulation)

	router.Run("0.0.0.0:2000")
	
}


