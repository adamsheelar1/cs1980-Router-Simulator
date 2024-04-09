package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/gin-gonic/gin"
)

func getPackets(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, totalClientData)
}

func getPacketsByClient(c *gin.Context) {
	client := c.Param("client")

	val, ok := totalClientData[client]
	if ok {
		c.IndentedJSON(http.StatusOK, val)
		return
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "client not found"})
}

func getThroughPackets(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, throughClientData)
}

func getThroughPacketsByClient(c *gin.Context) {
	client := c.Param("client")

	val, ok := throughClientData[client]
	if ok {
		c.IndentedJSON(http.StatusOK, val)
		return
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "client not found"})
}

func getTotalPackets(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, totalPackets)
}

func getTotalPacketsLost(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, totalPacketsLost)
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

		// naive approach to creating the profit we would get from using this item in the knapsack
		newPacket.Profit = newPacket.packet.Priority / newPacket.packet.Weight

		// store this bigger packet
		m.Lock()
		buffer = append(buffer, newPacket)
		m.Unlock()

		totalClientData[newPacket.packet.Client]++
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