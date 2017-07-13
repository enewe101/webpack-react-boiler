#!/usr/bin/env bash
# kill and remove the dev server container
docker kill dev-node &> /dev/null 
docker rm dev-node &> /dev/null
