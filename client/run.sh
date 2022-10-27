#!/usr/bin/sh
cd /var/www/skct/frontend/
npm install
whereis npm
npm run build
echo "Running Build Completed"
pm2 delete ecosystem.config.js
pm2 start ecosystem.config.js --env production
