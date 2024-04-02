package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func getPackets(c *gin.Context) {
	fmt.Println(throughApplications)
	c.IndentedJSON(http.StatusOK, throughApplications)
}

func getTotalPackets(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, totalPackets)
}

func getTotalPacketsLost(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, totalPacketsLost)
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

func postPacket(c *gin.Context) {
	var packetIn Packet
	var newPacket ExpandedPacket

	if err := c.BindJSON(&packetIn); err != nil {
		log.Println(err)
		return
	} else {
		totalPackets++
		newPacket.packet = packetIn
		newPacket.Priority = priority[newPacket.packet.Application]

		// naive approach to creating the profit we would get from using this item in the knapsack
		newPacket.Profit = newPacket.Priority / newPacket.packet.Weight

		fmt.Println("Contents of new packet we are posting")
		fmt.Println(newPacket)
		// store this bigger packet
		buffer = append(buffer, newPacket)
		fmt.Println(buffer)

		totalApplications[newPacket.packet.Application]++
		//fmt.Println(totalPackets)
	}
}

func postNetworkCapacity(c *gin.Context) {
	var newNetworkCapacity int
	if err := c.BindJSON(&newNetworkCapacity); err != nil {
		log.Println(err)
		return
	} else {
		networkCapacity = newNetworkCapacity
		fmt.Println("Network capacity changed to: ", networkCapacity)
	}
}