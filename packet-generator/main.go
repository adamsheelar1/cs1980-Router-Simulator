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
	router.POST("/runSimulation", runSimulation)
	
	router.DELETE("/deleteClient", deleteClient)

	router.Run("0.0.0.0:2000")
	
}


