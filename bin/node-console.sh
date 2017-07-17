#!/bin/sh
#
#   After starting up the production or development environments, run this
#   Command to see the stdout coming out of the node app.  You'll land in
#   a terminal that has activated the realtime log forwarding by ``pm2``, which
#   is the program that runs node.
#
#   To stop the node app, hit Ctrl-C to get out of realtime logging (you'll
#   still be in the node container though), and run ``pm2 kill``.  You can
#   restart node under pm2 by running ``pm2 start ecosystem.config.json``, or
#   run the node app without pm2, by running ``node server/app.js``.
#
docker exec -it mern_node_1 bash -c 'bash --init-file <(echo "pm2 log")'
