#!/usr/bin/env bash
# kill and remove the dev server container
docker kill dev-server &> /dev/null && docker rm dev-server &> /dev/null
