#!/usr/bin/env bash

set -e

yarn lerna bootstrap
yarn lerna run prepack
yarn lerna run codegen
yarn lint
yarn test
yarn lerna run build
