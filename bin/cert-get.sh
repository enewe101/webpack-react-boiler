#!/bin/sh

#
# The certificate directory is mapped to the non-docker host, so certificates
# persist even after the docker container is destroyed and recreated.  As a
# result, you will generally not need to run cert-get.sh -- it only needs to be
# run the very first time this container is created on the particular physical
# host on which it resides.  Therefore this step is not tied to container
# creation, and has to be run manually from within the container.
#

# Get a certificate
certbot certonly --webroot --webroot-path=/app -d $HOST

# Make a diffie-helman group.  Keep it with the certificates
openssl dhparam -out /etc/letsencrypt/live/$HOST/dhparam.pem 2048

