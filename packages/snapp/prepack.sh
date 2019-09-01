#!/usr/bin/env bash

set -e

cp ../../README.md .

npx rimraf dist
npx copyfiles -u 1 src/**/*.css dist
npx copyfiles -u 4 '../../examples/basic/{components,data,public,routes,state,typings}/**' dist/examples/basic
npx copyfiles -u 4 '../../examples/basic/{package.json,.gitignore,tsconfig.json}' dist/examples/basic
npx copyfiles -u 1 'src/{app,config}/**' dist
npx babel --config-file ../../babel.config --extensions '.ts,.tsx,.js' -d dist/tools src/tools

echo "prepack has been done."
