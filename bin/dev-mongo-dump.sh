#!/bin/sh

dump_name=dev-dump
#dump_name=$1
#
#if [ -z $dump_name ]; then
#	echo 'You need to specify the name of the dump.'
#	echo '    Usage: ./dev-mongo-dump <name-of-dump>'
#	exit 1
#fi

# Drop the previous dump-backup if it exists
rm -rf dump/dev-dump.bk

# Move the previous dump to be the new dump-backup
mv dump/dev-dump dump/dev-dump.bk

# Generate the dump within the container
docker exec -it dev-mongo-container mongodump

# Then, copy the dump to the host
mkdir dump &> /dev/null
docker cp dev-mongo-container:/dump dump/$dump_name

# Finally, remove the original copy of the dump left in the container
docker exec -it dev-mongo-container rm -r dump
