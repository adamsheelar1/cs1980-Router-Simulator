package main

import (
	//"log"
	"bytes"
	"fmt"
	"io/ioutil"

	//"net"
	"net/http"

	//"os"
	"flag"
	//"fmt"

	"github.com/gin-gonic/gin"
)

type runData struct {
	Packets      int    `json:"packets"`
	Target       string `json:"target"`
}

var rd runData

func init() {
	var ip_address_string string

	flag.IntVar(&rd.Packets, "packets", 0, "number of packets to send")
	flag.StringVar(&ip_address_string, "ip", "127.0.0.1", "ip address of target as a string")
	flag.Parse()
	
}

func main() {

	router := gin.Default()
	router.GET("/runData", getRunData)
	sendHello()
	router.Run("localhost:8080")
}


func getRunData(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, rd)
}

func sendHello() {
	url := "http://localhost:3000/packets"
	hello := []byte(`{"Priority":10,"Weight":111}`)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(hello))
	if err != nil {
		fmt.Print("%v\n", err)
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


