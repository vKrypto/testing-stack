package main

import (
	"fmt"
	"log"
	"net/http"
)

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, Docker and Go!")
}

func main() {
	http.HandleFunc("/", helloHandler)
	port := ":8080"
	fmt.Println("Server is listening on port", port)
	log.Fatal(http.ListenAndServe(port, nil))
}
