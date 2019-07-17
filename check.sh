#!/usr/bin/env bash

docker run \
    --rm  \
    -w /app \
    -v `pwd`:/app \
    -it node:10 bash ./build.sh
