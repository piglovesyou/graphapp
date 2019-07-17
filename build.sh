#!/usr/bin/env bash

set -e

yarn cache clean
rm -rf `yarn cache dir`

yarn lerna bootstrap
yarn lerna run prepack

find `pwd`/packages/uwf/dist

yarn lerna run codegen
yarn lint
yarn test
yarn lerna run build
