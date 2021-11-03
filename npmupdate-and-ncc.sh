#!/bin/sh

# this script can be run after zowe-common has new updates
cd npm-registry
npm update
cd ..
npm update
./ncc-build-all.sh

