package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"math/rand"
	"net/http"
	"os"
	"sync"
	"time"
)

// packetData type
type packetData struct {
	Client   string `json:"client"`
	Weight   int    `json:"weight"`
	Priority int    `json:"priority"`
}

type clientData struct {
	Client       string `json:"client"`
	WeightCap    int    `json:"weightcap"`
	FrequencyCap int    `json:"frequencycap"`
	PrioritySeed int    `json:"priorityseed"`
}

type runData struct {
	SimulationRate int `json:"simulationrate"`
}

var clients = []clientData{}

var m sync.Mutex

func spawnClients(ctx context.Context, sr int) {

	for i := 0; i < len(clients); i++ {
		ticker := time.NewTicker(time.Duration(sr) * time.Second)
		var packet packetData
		packet.Client = clients[i].Client
		packet.Weight = rand.Intn(clients[i].WeightCap)
		packet.Priority = rand.Intn(clients[i].PrioritySeed) * 100
		go func() {
			for {
				select {
				case <-ctx.Done():
					return
				case <-ticker.C:
					sendPacket(packet)
					//fmt.Println("")
					time.Sleep(time.Duration(rand.Intn(clients[i].FrequencyCap)+1) * time.Second)
					ticker.Reset(time.Duration(rand.Intn(clients[i].FrequencyCap)*2+1) * time.Second)
				}
			}
		}()
	}
}

func sendPacket(packet packetData) {
	// hard coded url of the api
	url := "http://api:3000/packets"
	payload, err := json.Marshal(packet)
	fmt.Fprintf(os.Stdout, "%s", payload)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(payload))
	if err != nil {
		fmt.Printf("%v\n", err)
		return
	}
	req.Header.Set("Content-Type", "application/json")

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		//Specific error handling would depend on scenario
		fmt.Printf("%v\n", err)
		return
	}

	body, err := io.ReadAll(res.Body)
	if err != nil {
		//Specific error handling would depend on scenario
		fmt.Printf("%v\n", err)
		return
	}

	fmt.Println(string(body))
	res.Body.Close()
}
