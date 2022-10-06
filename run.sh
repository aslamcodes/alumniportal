#!/usr/bin/sh
cd /var/www/skct/backend/
npm install
whereis npm
echo "Running Completed"
pm2 delete ecosystem.config.js
pm2 start ecosystem.config.js --env production
