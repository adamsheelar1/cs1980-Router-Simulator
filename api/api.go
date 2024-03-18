package main

import (
	//"encoding/json"
	"fmt"
	"log"
	"net/http"

	//"net/http"

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

// func getTotalPackets(c *gin.Context) {
// 	c.IndentedJSON(http.StatusOK, totalPackets)
// }

// func getServerPackets(c *gin.Context) {
// 	c.IndentedJSON(http.StatusOK, throughApplications["server"])
// }	

// func getSafetyPackets(c *gin.Context) {
// 	c.IndentedJSON(http.StatusOK, throughApplications["safety"])
// }

// func getSecurityPackets(c *gin.Context) {
// 	c.IndentedJSON(http.StatusOK, throughApplications["security"])
// }

// // TODO: change to just adding to buffer then run algorithm
// // everytime that we hit a certain amount of time
// func postPacket(c *gin.Context) {
// 	var newPacket packet

// 	if err := c.BindJSON(&newPacket); err != nil {
// 		log.Println(err)
// 		return
// 	} else {
// 		totalPackets++
// 		buffer = append(buffer, newPacket)
// 		totalApplications[newPacket.Application]++
// 		fmt.Println(totalPackets)
// 	}
	
// }

func main() {
	totalPackets = 0
	totalApplications = make(map[string]int)

	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/packets", getTotalPackets)
	router.GET("/lostpackets", getPacketsLost)
	router.GET("/server", getServerPackets)
	router.GET("/serverTotal", getServerTotal)
	router.GET("/safety", getSafetyPackets)
	router.GET("/safetyTotal", getSafetyTotal)
	router.GET("/security", getSecurityPackets)
	router.GET("/securityTotal", getSecurityTotal)

	router.POST("/packets", postPacket)

	router.Run("localhost:3000")

}
