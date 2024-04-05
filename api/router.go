package main

import (
	"sort"
	"sync"
)

//"fmt"

type Packet struct {
	Application string `json:"application"`
	Weight      int    `json:"weight"`
	Priority int 	   `json:"priority"`
}

type ExpandedPacket struct {
	packet Packet
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
	networkCapacity = 1000
	var newBuffer = []ExpandedPacket{}
	m.Lock()
	newBuffer = append(newBuffer, buffer...)
	buffer = nil
	m.Unlock()

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
