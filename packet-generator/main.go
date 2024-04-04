package main

import (
	"flag"
	"github.com/gin-gonic/gin"

)

type runData struct {
	Packets      int `json:"packets"`
	TimeInterval int `json:"timeinterval"`
}

var rd runData

func init() {
	// take command line args
	flag.IntVar(&rd.Packets, "packets", 0, "number of packets to send")
	flag.IntVar(&rd.TimeInterval, "time interval", 5, "time between packet launches")
	flag.Parse()
}


func main() {

	router := gin.Default()

	router.POST("/addClient", addClient)
	router.DELETE("/deleteClient", deleteClient)
	router.POST("/runSimulation", runSimulation)

	router.Run("0.0.0.0:2000")
	
}


