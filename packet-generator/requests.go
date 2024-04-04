package main

import (
	"context"
	"os"

	"github.com/gin-gonic/gin"
)

// router.POST("/addClient", addClient)
// router.DELETE("/deleteClient", deleteClient)
// router.POST("/runSimulation", runSimulation)

func addClient(c *gin.Context) {

}

func deleteClient(c *gin.Context) {

}

func runSimulation(c *gin.Context) {

		ctx, cancel := context.WithCancel(context.Background())
		sigc := make(chan os.Signal, 1)
		spawnClients(ctx)
		<-sigc
		cancel()
		
}