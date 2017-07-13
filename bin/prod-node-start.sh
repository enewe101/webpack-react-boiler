#!/bin/sh

# Stop and destroy the production node container if one exists.
./prod-node-stop.sh

# Start the production node container, linking it to the mongo container.
docker run -dp 80:80 --name prod-node-container
  --link=prod-mongo-container:mongodb enewel3/react:prod-node-1
