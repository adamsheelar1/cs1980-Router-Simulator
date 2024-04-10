package main

import (
	"time"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func main() {
	totalPackets = 0
	totalPacketsLost = 0
	networkCapacity = 1000
	totalClientData = make(map[string]int)
	throughClientData = make(map[string]int)
	totalClientWeight = make(map[string]int)
	throughClientWeight = make(map[string]int)
	lostClientData = make(map[string]int)


	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/packets", getPackets)
	router.GET("/packets/:Client", getPacketsByClient)

	router.GET("/throughPackets", getThroughPackets)
	router.GET("/throughPackets/:Client", getThroughPacketsByClient)

	router.GET("/weight", getWeight)
	router.GET("/weight/:Client", getWeightByClient)

	router.GET("/throughWeight", getThroughWeight)
	router.GET("/throughWeight/:Client", getThroughWeightByClient)

	router.GET("/PacketsLost", getPacketsLost)
	router.GET("/PacketsLost/:Client", getPacketsLostByClient)

	router.GET("/totalPackets", getTotalPackets)
	router.GET("/totalPacketsLost", getTotalPacketsLost)

	router.POST("/packets", postPacket)
	router.POST("/changeNetworkCapacity", postNetworkCapacity)
	

	ticker := time.NewTicker(5 * time.Second)
	done := make(chan bool)

	go func() {
		for {
			select {
			case <-done:
				return
			case <-ticker.C:
				runAlgorithm()
			}
		}
	}()

	router.Run("0.0.0.0:3000")

	router.Run("localhost:3000")
	// https://localhost:3000/
}
