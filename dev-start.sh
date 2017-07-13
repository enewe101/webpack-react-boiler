#!/usr/bin/env bash

# In case there was a previous server running, kill it
docker kill dev-node &> /dev/null
docker rm dev-node &> /dev/null

# Start the server container
docker run -dp 80:80 -v $(pwd):/usr/src/app --name dev-node \
    enewel3/react:dev-node-1

# Connect to the container and start the server in the connected tty
# This makes it easy to stop and restart the server as files are edited.
docker exec -it dev-node bash -c 'bash --init-file <(echo "node server/app.js")'
