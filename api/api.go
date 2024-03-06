package main

import (
	//"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

type packet struct {
	Application string `json:"application"`
	Weight   int `json:"weight"`
}

type inData struct {
	Packets     int16 `json:"packets"`
	Transmitting bool  `json:"transmitting"`
}

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

func getPacket(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, packets)
}

func postPacket(c *gin.Context) {
	var newPacket []packet

	if err := c.BindJSON(&newPacket); err != nil {
		log.Println(err)
		return
	} else {
		totalPackets++
		fmt.Println(totalPackets)
	}
	
}

func main() {
	totalPackets = 0
	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/packets", getPacket)
	router.POST("/packets", postPacket)

	router.Run("localhost:3000")

}
