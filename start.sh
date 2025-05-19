#!/bin/sh
echo "Start Frontend..."
node proxy-server.js &
nginx -g "daemon off;"