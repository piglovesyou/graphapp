#!/usr/bin/env bash

set -e

yarn
yarn lerna bootstrap
yarn lerna run prepack
