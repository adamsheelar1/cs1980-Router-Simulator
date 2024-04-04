package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
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

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		//Specific error handling would depend on scenario
		fmt.Printf("%v\n", err)
		return
	}

	fmt.Println(string(body))
	res.Body.Close()
}






