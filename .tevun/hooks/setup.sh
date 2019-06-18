#!/usr/bin/env bash

echo " ~> [hooks\setup.sh] on [${1}, ${2}]"

cd ${1}

cp .env.stage .env
cp docker-compose.yml.stage docker-compose.yml
