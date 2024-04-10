package main

import (
	"sort"
	"sync"
)

type Packet struct {
	Client string `json:"client"`
	Weight      int    `json:"weight"`
	Priority int 	   `json:"priority"`
}

type ExpandedPacket struct {
	packet Packet
	Profit int
}

var buffer = []ExpandedPacket{}

// the number of application packets
var totalClientData map[string]int

// the number of application packets that make it through
// missing packets per app = total - through
var throughClientData map[string]int

var totalClientWeight map[string]int
var throughClientWeight map[string]int

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
			cap-= newBuffer[i].packet.Weight
			throughClientWeight[newBuffer[i].packet.Client]+= newBuffer[i].packet.Weight
			throughClientData[newBuffer[i].packet.Client]++
		} else {
			totalPacketsLost++
		}
	}
}
