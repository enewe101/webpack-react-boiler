#!/usr/bin/env bash

# In case the server was already running, stop it.
./dev-stop.sh

# Start the mongo container
./dev-mongo-start.sh

# Start the server container
docker run -dp 80:80 -v $(pwd):/usr/src/app --name dev-node-container \
    --link=dev-mongo-container:mongodb enewel3/react:dev-node-1

# Connect to the container and start the server in the connected tty
# This makes it easy to stop and restart the server as files are edited.
docker exec -it dev-node-container bash -c 'bash --init-file <(echo "node server/app.js")'
