package main

import (
	"fmt"
)

type packet struct {
	Application string `json:"application"`
	Weight   int `json:"weight"`
}

var buffer = []packet{

}

var totalApplications map[string]int
var throughApplications map[string]int
var totalPackets int 
var packetsLost int

func runAlgorithm() {

}

func clearBuffer() {

}


