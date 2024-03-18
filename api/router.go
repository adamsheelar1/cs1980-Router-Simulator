package main

import (
	//"fmt"
)

type packet struct {
	Application string `json:"application"`
	Weight      int    `json:"weight"`
}

var buffer = []packet{}

var totalApplications map[string]int
var throughApplications map[string]int
var totalPackets int
var totalPacketsLost int

var networkCapacity int

func runAlgorithm() {

}
