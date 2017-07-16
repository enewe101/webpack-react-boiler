#!/bin/sh
docker build -t enewel3/react:base-node-1 -f docker/base-node-dockerfile .
docker build -t enewel3/react:dev-node-1 -f docker/dev-node-dockerfile .
docker build -t enewel3/react:prod-node-1 -f docker/prod-node-dockerfile .
docker build -t enewel3/react:mongo-1 -f docker/mongo-dockerfile .
