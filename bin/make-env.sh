#!/bin/sh
passgen () {
	date +%s | sha256sum | base64 | head -c 32 ; echo
}

my_env=$(gpg < .keys.gpg)
my_env=${my_env}'
export PROJ_NAME=webpack-react-boiler
export USE_SSL=1
export APP_DB_USER=appuser
export APP_DB_PASS='`passgen`'
export HOST=aventamedia.com
export HOST_USER=appuser
export HOST_USER_PASS='`passgen`'
export MONGO_INITDB_ROOT_USERNAME=root
export MONGO_INITDB_ROOT_PASSWORD='`passgen`

echo "$my_env" | gpg -co .env.gpg

