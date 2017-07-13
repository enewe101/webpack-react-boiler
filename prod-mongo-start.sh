#!/bin/sh

# Check if the prod-mongo-volume exists already
mongo_volume_exists=$(\
	docker volume ls | tr -s ' ' | cut -f2 -d' ' | egrep '^prod-mongo-volume$'\
)

# If the volume doesn't exist, make it
if [ -z $mongo_volume_exists ]; then
	echo 'creating prod-mongo-volume'
	docker volume create --name prod-mongo-volume
fi

# Create a mongodb production container (destroy old one first if exsits).
./prod-mongo-stop.sh
docker run -dv prod-mongo-volume:/data/db --name prod-mongo-container \
	enewel3/react:mongo

# And if we just created the volume, then we need to seed mongodb
if [ -z $mongo_volume_exists ]; then
	echo 'seeding prod-mongo-container'
	docker exec prod-mongo-container \
		bash -c 'mongo < /usr/src/app/prod-mongo-setup.js'
fi
