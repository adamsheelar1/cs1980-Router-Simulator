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
	totalApplications = make(map[string]int)
	throughApplications = make(map[string]int)


	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/packets", getPackets)
	router.GET("/totalPacketsLost", getTotalPacketsLost)
	router.GET("/totalPackets", getTotalPackets)

	router.POST("/packets", postPacket)
	router.POST("/changeNetworkCapacity", postNetworkCapacity)


	// https://localhost:3000/

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
