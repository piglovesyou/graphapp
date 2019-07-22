#!/usr/bin/env bash

yarn run rimraf dist
yarn run copyfiles -u 1 src/**/*.css dist
yarn run copyfiles -u 4 '../../examples/basic/{components,data,public,routes,state}/**' dist/examples/basic
yarn run copyfiles -u 4 '../../examples/basic/{package.json,.gitignore}' dist/examples/basic
yarn run babel --config-file ../../babel.config --extensions '.ts,.tsx,.js' -d dist src
