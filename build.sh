#!/usr/bin/env bash

set -e

# Use fresh yarn
npm i -g npm
npm i -g yarn

# Yarn holds old uwd so it doesn't use new packed one
yarn cache clean uwf
rm -rf `yarn cache dir`/.tmp

yarn install
yarn lerna bootstrap
yarn lerna run prepack
yarn lerna run codegen
yarn lint
yarn test
yarn lerna run build
