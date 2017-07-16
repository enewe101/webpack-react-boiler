#!/bin/sh
#
#    This script lets you dump the data from a running mongodb container  called
#    "reactexpress_mongodb_1" (which is the name both under production and
#    develompment environments).  The dump will be placed in this-proj/dumps
#    within a new directory named whatever you pass as an argument (defaults to
#    "dump").
#
#    This can be used for both production and development.
#

dumpname=$1

if [ -z $dumpname ]; then
  dumpname=dump
fi

# Drop the previous dump-backup if it exists
rm -rf dumps/$dumpname.bk

# Move the previous dump to be the new dump-backup
mv -f dumps/$dumpname dumps/$dumpname.bk

# Generate the dump within the container
docker exec -it reactexpress_mongodb_1 mongodump

# Then, copy the dump to the host
mkdir dump &> /dev/null
docker cp reactexpress_mongodb_1:/dump dumps/$dumpname

# Finally, remove the original copy of the dump left in the container
docker exec -it reactexpress_mongodb_1 rm -r dump
