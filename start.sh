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

# Default set up the development environment; --prod to chose production.
# Figure out if the --prod arugment was set (remove it from args list if so)
ARGS=""; IS_PROD=0
for var in "$@"; do test "$var" != '--prod' && ARGS="$ARGS $var" || IS_PROD=1; done


if [ $IS_PROD -eq 1 ]; then
   export NODE_ENV=production
   export APP_VOLUME_PATH=../dummy
else
   export NODE_ENV=development
fi
echo "Starting up $NODE_ENV environment"

# Dev: source the .env file;  Prod: expect env to be supplied--check it.
if [ "$NODE_ENV" = "development" ]; then
    source .env
else
    if [ -z "$APP_PATH" ]; then echo "Need to set APP_PATH."; fi
    if [ -z "$USE_SSL" ]; then echo "Need to set USE_SSL."; fi
    if [ -z "$APP_DB_USER" ]; then echo "Need to set APP_DB_USER."; fi
    if [ -z "$APP_DB_PASS" ]; then echo "Need to set APP_DB_PASS."; fi
    if [ -z "$HOST" ]; then echo "Need toset HOST."; fi
    if [ -z "$HOST_USER" ]; then echo "Need to set HOST_USER."; fi
    if [ -z "$HOST_USER_PASS" ]; then echo "Need to set HOST_USER_PASS."; fi
    if [ -z "$MONGO_INITDB_ROOT_USERNAME" ]; then 
        echo "Need to set MONGO_INITDB_ROOT_USERNAME.";
    fi
    if [ -z "$MONGO_INITDB_ROOT_PASSWORD" ]; then 
        echo "Need to set MONGO_INITDB_ROOT_PASSWORD.";
    fi
fi

# Notify whether SSL being used; if yes, ensure certificate-related files exist.
if [ -z $USE_SSL ] || [ $USE_SSL -eq 0 ]; then
    echo "NO SSL"
else
    echo "Using SSL"
    CERT_PATH=/home/$HOST_USER/$PROJ_NAME/cert
    if [ ! -f $CERT_PATH/dhparam.pem ]; then
         echo "SSL: expected $CERT_PATH/dhparam.pem"; exit 1; fi
    if [ ! -f $CERT_PATH/fullchain.pem ]; then
        echo "SSL: expected $CERT_PATH/fullchain.pem"; exit 1; fi
    if [ ! -f $CERT_PATH/privkey.pem ]; then
        echo "SSL: expected $CERT_PATH/privkey.pem"; exit 1; fi
fi

# Figure out if --force-recreate was included as an arg.  If so, remove all
# images, volumes, and containers
for var in "$ARGS"; do test "$var" = "--force-recreate" && ./docker-rm; done

# Now call docker-compose, and pass through all the arguments
echo docker-compose -p mern -f docker/docker-compose.yml up "$ARGS"
docker-compose -p mern -f docker/docker-compose.yml up $ARGS
