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

	router := gin.Default()
	router.Use(CORSMiddleware())
	router.GET("/getClients", getClients)
	router.GET("/getClients/:Client", getClientsByName)

	router.POST("/addClient", addClient)
	router.POST("/updateClientData", updateClientData)
	router.POST("/runSimulation", runSimulation)

	router.DELETE("/deleteClient", deleteClient)

	router.Run("0.0.0.0:2000")

}
