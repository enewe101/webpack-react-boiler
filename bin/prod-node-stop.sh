#!/bin/sh
# Stop and destroy the production node container.
docker kill prod-node-container &> /dev/null
docker rm prod-node-container &> /dev/null
