#!/usr/bin/env bash
#
#   Start the production environment.  Builds and runs two containers:
#   1) a node server running under pm2 supervisor with nginx reverse-proxy
#   2) a mongodb instance
#
#   The mongodb instance uses a volume so changes are persisted after you stop
#   the containers.
#
#   Use Ctrl-C to stop the containers.
#
#   If something happens and the containers aren't starting properly,
#   Try running using the ``--force-recreate`` option, i.e. do
#       ``docker-compose -f docker-compose-production.yml up --force-recreate``
#   As a last resort, try killing, removing all containers, volumes, and images,
#   and then run this script.
#
if [ -z $APP_DB_USER ]; then
	echo 'You forgot to source the production environment variables'
	exit 1
fi

# Notify if SSL isn't being used, since in production, normally it should be
test -z $USE_SSL || test $USE_SSL -eq 0 && \
	echo "Building without nginx configured for ssl!?"

if [ -n "$1" ]; then
	if [ "$1" = "--force-recreate" ]; then
		docker-compose -p mern -f docker/docker-compose-production.yml down
		docker volume prune 
	fi
fi
docker-compose -p mern -f docker/docker-compose-production.yml up
