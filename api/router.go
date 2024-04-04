package main

import (
	"fmt"
	"sort"
	"sync"
)

//"fmt"

type Packet struct {
	Application string `json:"application"`
	Weight      int    `json:"weight"`
}

type ExpandedPacket struct {
	packet Packet
	Priority int
	Profit int
}

var buffer = []ExpandedPacket{}

var totalApplications map[string]int

// the number of application packets that make it through
// missing packets per app = total - through
var throughApplications map[string]int


var totalPackets int
var totalPacketsLost int

// configurable network capacity via a POST request
// for changing the algorithm while its running
var networkCapacity int

var m sync.Mutex

var priority = map[string]int{
	"server" : 1000,
	"safety" : 1500,
	"security" : 1300,
}

func runAlgorithm() {
	// copy old buffer and clear it so it can keep filling while we run the algorithm
	fmt.Println("Printing buffer before copy")
	fmt.Println(buffer)
	networkCapacity = 1000
	var newBuffer = []ExpandedPacket{}
	m.Lock()
	newBuffer = append(newBuffer, buffer...)
	buffer = nil
	m.Unlock()

	fmt.Println("Printing buffer after copy")
	fmt.Println(newBuffer)
	// sort newBuffer
	sort.Slice(newBuffer, func(i, j int) bool {
		return newBuffer[i].Priority > newBuffer[j].Priority
	})

	fmt.Println("Printing buffer after sort")
	fmt.Println(newBuffer)
	
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
