#!/bin/sh

dump_name=prod-dump
#dump_name=$1
#
#if [ -z $dump_name ]; then
#	echo 'You need to specify the name of the dump.'
#	echo '    Usage: ./prod-mongo-dump <name-of-dump>'
#	exit 1
#fi

# Drop the previous dump-backup if it exists
rm -rf dump/prod-dump.bk

# Move the previous dump to be the new dump-backup
mv dump/prod-dump dump/prod-dump.bk

# First, generate the dump within the container
docker exec -it prod-mongo-container mongodump

# Then, copy the dump to the host
mkdir dump &> /dev/null
docker cp prod-mongo-container:/dump dump/$dump_name

# Finally, remove the original copy of the dump left in the container
docker exec -it prod-mongo-container rm -r dump

