#!/usr/bin/env bash

set -e

yarn cache clean uwf
# Yarn leaves cache of tar package
rm -rf `yarn cache dir`/.tmp

yarn lerna bootstrap
yarn lerna run prepack

find `pwd`/packages/uwf/dist

yarn lerna run codegen
yarn lint
yarn test
yarn lerna run build
