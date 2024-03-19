package main

import "sort"

//"fmt"

type packet struct {
	Application string `json:"application"`
	Weight      int    `json:"weight"`
}

type expandedPacket struct {
	packet packet
	Priority int
	Profit int
}


var buffer = []expandedPacket{}

var totalApplications map[string]int

// the number of application packets that make it through
// missing packets per app = total - through
var throughApplications map[string]int


var totalPackets int
var totalPacketsLost int

// configurable network capacity via a POST request
// for changing the algorithm while its running
var networkCapacity int

var priority = map[string]int{
	"server" : 1000,
	"safety" : 1500,
	"security" : 1300,
}


func runAlgorithm() {
	// copy old buffer and clear it so it can keep filling while we run the algorithm
	var newBuffer = []expandedPacket{}
	copy(newBuffer, buffer)
	buffer = nil

	// sort newBuffer
	sort.Slice(newBuffer, func(i, j int) bool {
		return newBuffer[i].Priority > newBuffer[j].Priority
	})
	
	cap := networkCapacity

	for i := 1; i < len(newBuffer); i++ {
		if cap > newBuffer[i].packet.Weight {
			cap -= newBuffer[i].packet.Weight
			throughApplications[newBuffer[i].packet.Application]++
		} else {
			totalPacketsLost++
		}
	}
}
