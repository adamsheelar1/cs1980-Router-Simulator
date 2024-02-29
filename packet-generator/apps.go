package main

import (

)

// packetData type
type packetData struct {
	Application string `json:"application"`
	Weight int	`json:"weight"`
}

// array of packet data, to be encoded for sending to the api
var packets = []packetData{
	{Application: "Server", Weight: 100},
}

