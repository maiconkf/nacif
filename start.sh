#!/bin/bash

echo "Starting Todo Application (Development)..."
echo "========================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "Error: Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Stop any existing containers
echo "Stopping existing containers..."
docker-compose down

# Clean up old images (optional)
read -p "Do you want to rebuild from scratch? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Removing old images..."
    docker-compose down --rmi all
fi

# Build and start the application
echo "Building and starting the application..."
docker-compose up --build

echo ""
echo "Application stopped."
