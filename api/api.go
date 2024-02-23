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
	router.GET("/packets", getPacket)
	router.POST("/packets", postPacket)

	router.Run("localhost:3000")

}
