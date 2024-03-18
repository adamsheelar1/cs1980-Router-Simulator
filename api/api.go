package main

import (
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
	totalApplications = make(map[string]int)

	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/packets", getTotalPackets)
	router.GET("/packetsLost", getTotalPacketsLost)
	router.GET("/server", getServerThrough)
	router.GET("/serverTotal", getServerTotal)
	router.GET("/safety", getSafetyThrough)
	router.GET("/safetyTotal", getSafetyTotal)
	router.GET("/security", getSecurityThrough)
	router.GET("/securityTotal", getSecurityTotal)

	router.POST("/packets", postPacket)
	router.POST("/changeNetworkCapacity", postNetworkCapacity)

	router.Run("localhost:3000")
}
