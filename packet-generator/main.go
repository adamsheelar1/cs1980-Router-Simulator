package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type runData struct {
	Packets      int16 `json:"packets"`
	Transmitting bool  `json:"transmitting"`
}

var runDatas = []runData{
	{Packets: 0, Transmitting: false},
}

func main() {
	router := gin.Default()
	router.GET("/runData", getRunData)

	router.Run("localhost:8080")
}

func getRunData(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, runDatas)
}
