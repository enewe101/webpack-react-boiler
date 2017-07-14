#!/bin/sh

# Check if the development mongo volume exists already.
mongo_volume_exists=$(\
	docker volume ls | tr -s ' ' | cut -f2 -d' ' | egrep '^dev-mongo-volume$'\
)

# If the volume doesn't exist, make it.
if [ -z $mongo_volume_exists ]; then
	echo 'creating dev-mongo-volume'
	docker volume create --name dev-mongo-volume
fi

# Stop and destroy the development mongo container.
./bin/dev-mongo-stop.sh
# Start the development mongo container.
docker run -dv dev-mongo-volume:/data/db --name dev-mongo-container \
	enewel3/react:mongo-1

# And if we just created the volume, then we need to seed mongodb.
if [ -z $mongo_volume_exists ]; then
	echo 'seeding dev-mongo-container'
	docker cp dump/dev-dump dev-mongo-container:/dump
	docker exec dev-mongo-container mongorestore /dump
fi
