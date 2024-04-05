package main

import (
	"sort"
	"sync"
)

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

// the number of application packets
var totalApplications map[string]int

// the number of application packets that make it through
// missing packets per app = total - through
var throughApplications map[string]int

var totalPackets int
var totalPacketsLost int

// for changing the algorithm while its running
var networkCapacity int

var m sync.Mutex

func runAlgorithm() {
	// copy old buffer and clear it so it can keep filling while we run the algorithm
	var newBuffer = []ExpandedPacket{}
	m.Lock()
	newBuffer = append(newBuffer, buffer...)
	buffer = nil
	m.Unlock()

	// sort newBuffer
	sort.Slice(newBuffer, func(i, j int) bool {
		return newBuffer[i].packet.Priority > newBuffer[j].packet.Priority
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
