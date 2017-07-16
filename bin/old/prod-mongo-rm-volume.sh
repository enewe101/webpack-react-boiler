#!/bin/sh

docker volume rm $1 prod-mongo-volume || \
	echo 'Run prod-mongo-stop.sh first'


