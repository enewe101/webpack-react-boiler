#!/bin/sh

# NOTE: this must be run from the root dir of the app, because it mounts the
#       app directory by mounting current working directory.

# Stop and destroy the development node container if one exists.
./dev-node-stop.sh

# Start the development node container, linkin it to the mongo container.
docker run -dp 80:80 -v $(pwd):/usr/src/app --name dev-node-container \
    --link=dev-mongo-container:mongodb enewel3/react:dev-node-1

# Connect to the container and start the node server a tty.
# This makes it easy to stop and restart the node server as files are edited,
# without having to stop and start the node container.
docker exec -it dev-node-container bash -c 'bash --init-file <(echo "node server/app.js")'
