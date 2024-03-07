package main

import (
	"context"
	"time"

	"math/rand"
)

// packetData type
type packetData struct {
	Application string `json:"application"`
	Weight int	`json:"weight"`
}

var applications = []string{
	"server", 
	"safety",
	"security",
}

var weights = []int{
	100,
	150,
	150,
}

func spawnClients(ctx context.Context) {

	for i := 0; i < len(applications); i++ {
		ticker := time.NewTicker(time.Duration(rd.TimeInterval) * time.Second)
		var packet packetData
		packet.Application = applications[i]
		packet.Weight = weights[i]
		go func()  {
			for {
				select {
				case <- ctx.Done():
					return
				case <- ticker.C:
					sendPacket(packet)
					//fmt.Println("")
					time.Sleep(time.Duration(rand.Intn(5)) * time.Second)
					ticker.Reset(time.Duration(rand.Intn(4)+2) * time.Second)
				}
			}
		}()
	}

}






