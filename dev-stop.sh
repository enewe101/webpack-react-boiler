#!/usr/bin/env bash
# kill and remove the dev server container
docker kill dev-node-container &> /dev/null
docker rm dev-node-container &> /dev/null
