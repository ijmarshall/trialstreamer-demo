#!/bin/bash

git pull
npm ci
npm run build
cd dist && sudo cp -r * /var/www/trialstreamer-demo 
