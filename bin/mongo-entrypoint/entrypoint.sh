#!/usr/bin/env bash
echo "Creating mongo users..."
mongo admin --host localhost -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD --eval \
  "db = db.getSiblingDB('react'); \
  db.createUser({\
    user: '"$APP_DB_USER"', pwd: '"$APP_DB_PASS"',\
    roles: [{role: 'readWrite', db: 'react'}]\
  })"
echo "Mongo users created."
