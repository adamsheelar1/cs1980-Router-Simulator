package main

import (
	"bytes"
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"os"
	"os/signal"
	"syscall"
	"github.com/gin-gonic/gin"
	//"log"
	"net/http"
	//"time"
)

type runData struct {
	Packets      int `json:"packets"`
	TimeInterval int `json:"timeinterval"`
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

	// just want to call spawnClients()
	ctx, cancel := context.WithCancel(context.Background())
	sigc := make(chan os.Signal, 1)
	spawnClients(ctx)
	<-sigc
	cancel()

	router := gin.Default()
	router.Run("0.0.0.0:2000")

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
