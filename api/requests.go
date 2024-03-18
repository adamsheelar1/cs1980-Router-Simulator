package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func getTotalPackets(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, totalPackets)
}

func getServerThrough(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, throughApplications["server"])
}	

func getServerTotal(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, totalApplications["server"])
}	


func getSafetyThrough(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, throughApplications["safety"])
}

func getSafetyTotal(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, totalApplications["safety"])
}

func getSecurityThrough(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, throughApplications["security"])
}

func getSecurityTotal(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, totalApplications["security"])
}

// TODO: change to just adding to buffer then run algorithm
// everytime that we hit a certain amount of time
func postPacket(c *gin.Context) {
	var newPacket packet

	if err := c.BindJSON(&newPacket); err != nil {
		log.Println(err)
		return
	} else {
		totalPackets++
		buffer = append(buffer, newPacket)
		totalApplications[newPacket.Application]++
		fmt.Println(totalPackets)
	}
	
}