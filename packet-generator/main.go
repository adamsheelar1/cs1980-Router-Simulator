package main

import (
	"bytes"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"os"

	//"log"
	"net/http"
	"time"
)

type runData struct {
	Packets      int    `json:"packets"`
	TimeInterval int	`json:"timeinterval"`
}

var rd runData

func init() {
	// take command line args
	flag.IntVar(&rd.Packets, "packets", 0, "number of packets to send")
	flag.IntVar(&rd.TimeInterval, "time interval", 5, "time between packet launches")
	flag.Parse()
}
// make a context,
// ctx, cancel := ontext.WithCancel(context.Background())
func main() {
	ticker := time.NewTicker(time.Duration(rd.TimeInterval) * time.Second)
	done := make(chan bool) 
	// -> use cancel instead
	
	// launch a goroutine
	go func() {
		for {
			select {
		
			case <- done:
				return
			case t := <- ticker.C:
				sendPacket()
				fmt.Println("Packet sent at: ", t)
				//time.Sleep(randomTime)
				//ticker.Reset(duration)

			}
		}
	}()
	time.Sleep(60 * time.Second)
	ticker.Stop()
	done <- true
	fmt.Println("Ticker Stopped")
}

func sendPacket() {
	// hard coded url of the api
	url := "http://localhost:3000/packets"
	payload, err := json.Marshal(packets)
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


