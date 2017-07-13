#!/bin/sh
# Stop and destroy the development node container.
docker kill dev-node-container &> /dev/null
docker rm dev-node-container &> /dev/null
