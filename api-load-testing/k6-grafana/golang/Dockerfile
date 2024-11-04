# Use the official Go image as a build stage
FROM golang:1.20-alpine AS builder

# Set the current working directory inside the container
WORKDIR /app

# Copy the Go modules files
COPY go.mod ./
COPY go.sum ./
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the Go application
RUN go build -o /go-docker-sample

# Use a minimal image to run the built Go app
FROM alpine:latest

# Set the working directory inside the new container
WORKDIR /root/

# Copy the Go binary from the builder stage
COPY --from=builder /go-docker-sample .

# Expose the port on which the app will run
EXPOSE 8080

# Command to run the binary
CMD ["./src"]
