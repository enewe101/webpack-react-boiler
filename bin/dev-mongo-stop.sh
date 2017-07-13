#!/bin/sh
# Stop and destroy the development mongo container
docker kill dev-mongo-container &> /dev/null
docker rm dev-mongo-container &> /dev/null
