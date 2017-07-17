#!/usr/bin/env bash
#
#   Start the development environment.  Builds and runs two containers:
#   1) a node server running under pm2 supervisor with nginx reverse-proxy
#   2) a mongodb instance
#
#   The mongodb instance uses a volume so changes are persisted after you stop
#   the containers.
#
#   Use Ctrl-C to stop the containers.
#
#   If something happens and the containers aren't starting properly,
#   Try running using the ``--build`` option, i.e. do
#       ``docker-compose -f docker-compose-development.yml up --build``
#   As a last resort, try killing, removing all containers, volumes, and images,
#   and then run this script.
#
source .env
if [ -n "$1" ]; then
	if [ "$1" = "--force-recreate" ]; then
		docker-compose -p mern -f docker/docker-compose-development.yml down
	fi
fi
docker-compose -p mern -f docker/docker-compose-development.yml up "$@"
