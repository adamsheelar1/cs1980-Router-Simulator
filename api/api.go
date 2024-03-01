package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type packet struct {
	Priority float64 `json:"priority"`
	Weight   float64 `json:"weight"`
}

type inData struct {
	Packets     int16 `json:"packets"`
	Transmiting bool  `json:"transmiting"`
}

var packets = []packet{
	{Priority: 10, Weight: 200},
	{Priority: 15, Weight: 2000},
	{Priority: 1, Weight: 100},
	{Priority: 20, Weight: 10},
}

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
	var newPacket packet

	if err := c.BindJSON(&newPacket); err != nil {
		return
	}
	packets = append(packets, newPacket)
}

func main() {
	router := gin.Default()
	router.Use(CORSMiddleware())

	router.GET("/packets", getPacket)
	router.POST("/packets", postPacket)

	router.Run("localhost:3000")

}
