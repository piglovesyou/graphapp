#!/usr/bin/env bash

# gh-pages:README.md is treated always as the latest README.md.
# Run ./apply-readme.sh to apply it to master branch.

git show gh-pages:README.md | sed -e 's/^<.*$//g' > README.md