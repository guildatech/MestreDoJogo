#!/usr/bin/env bash

if [ ! -f node_modules ]; then
  npm install
fi

npm run start