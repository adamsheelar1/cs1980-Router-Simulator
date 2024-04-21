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

func getWeight(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, totalClientWeight)
}

func getWeightByClient(c *gin.Context) {
	client := c.Param("client")

	val, ok := totalClientWeight[client]
	if ok {
		c.IndentedJSON(http.StatusOK, val)
		return
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "client not found"})
}

func getThroughWeight(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, throughClientWeight)
}

func getThroughWeightByClient(c *gin.Context) {
	client := c.Param("client")

	val, ok := throughClientWeight[client]
	if ok {
		c.IndentedJSON(http.StatusOK, val)
		return
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "client not found"})
}

func getPacketsLost(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, lostClientData)
}

func getPacketsLostByClient(c *gin.Context) {
	client := c.Param("client")

	val, ok := lostClientData[client]
	if ok {
		c.IndentedJSON(http.StatusOK, val)
		return
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "client not found"})
}

func getTotalPackets(c *gin.Context) {
	var packetSent []gin.H
	for client, packets := range totalClientData{
		packetSent = append(packetSent, gin.H{
			"client": client,
			"packets": packets,
		})
	}

	c.IndentedJSON(http.StatusOK, packetSent)
}

func getTotalPacketsLost(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, totalPacketsLost)
}

// func getThroughput(c *gin.Context) {
// 	c.IndentedJSON(http.StatusOK, )
// }

func getThroughputByClient(c *gin.Context) {
	client := c.Param("client")

	val, ok := throughClientWeight[client]
	if ok {
		c.IndentedJSON(http.StatusOK, val/algoCount)
		return
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "client not found"})
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

		client:= packetIn.Client
		if _, ok := totalClientData[client]; ok {
			totalClientData[client]++
		} else {
			totalClientData[client] = 1
		}
		if _, ok := totalClientWeight[client]; ok {
            totalClientWeight[client] += newPacket.packet.Weight
        } else {
            totalClientWeight[client] = newPacket.packet.Weight
        }

		
		fmt.Println("TotalClientData:", totalClientData)
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