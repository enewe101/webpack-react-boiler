#!/usr/bin/env bash
docker kill prod-server > /dev/null && docker rm prod-server > /dev/null
