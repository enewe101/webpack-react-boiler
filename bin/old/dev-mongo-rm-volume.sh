#!/bin/sh

docker volume rm $1 dev-mongo-volume || \
	echo 'Run dev-mongo-stop.sh first'

