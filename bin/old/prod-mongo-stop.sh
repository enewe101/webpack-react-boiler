#!/bin/sh
# Stop and destroy the production mongo container.
docker kill prod-mongo-container &> /dev/null
docker rm prod-mongo-container &> /dev/null
