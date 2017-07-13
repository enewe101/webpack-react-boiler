#!/bin/sh

# Check if the dev-mongo-volume exists already
mongo_volume_exists=$(\
	docker volume ls | tr -s ' ' | cut -f2 -d' ' | egrep '^dev-mongo-volume$'\
)

# If the volume doesn't exist, make it
if [ -z $mongo_volume_exists ]; then
	echo 'creating dev-mongo-volume'
	docker volume create --name dev-mongo-volume
fi

# Create a mongodb dev container (in case one already exists destroy it first).
./dev-mongo-stop.sh
docker run -dv dev-mongo-volume:/data/db --name dev-mongo-container enewel3/react:mongo

# And if we just created the volume, then we need to seed mongodb
if [ -z $mongo_volume_exists ]; then
	echo 'seeding dev-mongo-container'
	docker exec dev-mongo-container bash -c 'mongo < /usr/src/app/dev-mongo-setup.js'
fi

# docker volume rm $(docker volume ls -f dangling=true -q)
