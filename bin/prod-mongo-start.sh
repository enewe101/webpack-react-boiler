#!/bin/sh

# Check if the production mongo volume exists already.
mongo_volume_exists=$(\
	docker volume ls | tr -s ' ' | cut -f2 -d' ' | egrep '^prod-mongo-volume$'\
)

# If the volume doesn't exist, make it.
if [ -z $mongo_volume_exists ]; then
	echo 'creating prod-mongo-volume'
	docker volume create --name prod-mongo-volume
fi

# Stop and destroy the production mongo container.
./bin/prod-mongo-stop.sh
# Start the production mongo container.
docker run -dv prod-mongo-volume:/data/db --name prod-mongo-container \
	enewel3/react:mongo-1

# And if we just created the volume, then we need to seed mongodb.
if [ -z $mongo_volume_exists ]; then
	echo 'seeding prod-mongo-container'
	docker cp dump/prod-dump prod-mongo-container:/dump
	docker exec prod-mongo-container mongorestore /dump
fi
