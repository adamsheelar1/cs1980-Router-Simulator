package main

import (
	//"encoding/json"
	"fmt"
	"log"
	"net/http"

	//"net/http"

	"github.com/gin-gonic/gin"
)

type packet struct {
	Application string `json:"application"`
	Weight   int `json:"weight"`
}

var applications map[string]int
var totalPackets int

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

func getTotalPackets(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, totalPackets)
}

func getServerPackets(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, applications["server"])
}	

func getSafetyPackets(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, applications["safety"])
}

func getSecurityPackets(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, applications["security"])
}

func postPacket(c *gin.Context) {
	var newPacket packet

	if err := c.BindJSON(&newPacket); err != nil {
		log.Println(err)
		return
	} else {
		totalPackets++
		applications[newPacket.Application]++
		fmt.Println(totalPackets)
	}
	
}

func main() {
	totalPackets = 0
	applications = make(map[string]int)

	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/packets", getTotalPackets)
	router.GET("/server", getServerPackets)
	router.GET("/safety", getSafetyPackets)
	router.GET("/security", getSecurityPackets)

	router.POST("/packets", postPacket)

	router.Run("localhost:3000")

}
