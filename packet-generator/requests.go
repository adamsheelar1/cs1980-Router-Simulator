package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

// router.POST("/addClient", addClient)
// router.DELETE("/deleteClient", deleteClient)
// router.POST("/runSimulation", runSimulation)

func getClients(c *gin.Context) {
	var clientNames []string
	for i := 0; i < len(clients); i++ {
		clientNames = append(clientNames, clients[i].Client)
	}
	c.IndentedJSON(http.StatusOK, clientNames)
}

func addClient(c *gin.Context) {
	var newClient clientData

	if err := c.BindJSON(&newClient); err != nil {
		log.Println(err)
		return
	} else {
		m.Lock()
		clients = append(clients, newClient)
		m.Unlock()
	}
}

func updateClientData(c *gin.Context) {
	var updateData clientData

	if err := c.BindJSON(&updateData); err != nil {
		log.Println(err)
		return
	} else {
		for i := 0; i < len(clients); i++ {
			if (clients[i].Client == updateData.Client) {
				m.Lock()
				clients[i].WeightCap = updateData.WeightCap
				clients[i].FrequencyCap = updateData.FrequencyCap
				clients[i].PrioritySeed = updateData.PrioritySeed
				m.Unlock()
				break
			}
		}	
		fmt.Println("client not found during updateClientData call")
	}
}

func deleteClient(c *gin.Context) {
	var clientToDelete string

	if err := c.BindJSON(&clientToDelete); err != nil {
		log.Println(err)
		return
	} else {
		for i := 0; i < len(clients); i++ {
			if (clients[i].Client == clientToDelete) {
				m.Lock()
				clients = append(clients[:i],clients[i+1:]...)
				m.Unlock()
				fmt.Println("successfully removed client from clients")
				break
			}
		}
		fmt.Println("client not found during deleteClient call")
	}

}


func runSimulation(c *gin.Context) {
		ctx, cancel := context.WithCancel(context.Background())
		sigc := make(chan os.Signal, 1)
		spawnClients(ctx)
		<-sigc
		cancel()
}

