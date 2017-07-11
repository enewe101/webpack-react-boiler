#!/usr/bin/env bash

# In case there was a previous server running, kill it
docker kill dev-server &> /dev/null && docker rm dev-server &> /dev/null
# Start the server container
docker run -dp 80:80 -v $(pwd):/usr/src/app --name dev-server enewel3/react:dev1
# Connect to the container and start the server in the connected tty
# This makes it easy to stop and restart the server
docker exec -it dev-server bash -c 'bash --init-file <(echo "node server/app.js")'
