# setup action for NodeJS project

This action does setup before building Nodejs project. Specifically configuring install registries and publish registries and logging in.

## Inputs

#### `package-name`
**Required** The name of the package.
#### `nodejs-version`
**Required** The version of nodejs to be used for building.
#### `install-registry-url`
**Required** Install registry URL.
#### `install-registry-email`
**Required** Install registry email.
#### `install-registry-username`
**Required** Install registry username.
#### `install-registry-password`
**Required** Install registry password
#### `install-registry-token-credential`
**Optional** Install registry token credential (will prioritize token authentication if provided)
#### `publish-registry-email`
**Required** Publish registry email
#### `publish-registry-username`
**Required** Publish registry username
#### `publish-registry-password`
**Required** Publish registry password
#### `publish-registry-token-credential`
**Optional** Publish registry token credential (will prioritize token authentication if provided)
#### `always-use-npm-install`
**Optional** Always to use `npm install`. Default `false`
#### `exit-if-folder-not-clean`
**Optional** exit workflow if at the end git folder not clean

## Exported environment variables (global, for subsequent workflow steps to consume)
#### `PACKAGE_INFO` Selected infomation in package.json in JSON string format.


## Example usage
```
uses: zowe-actions/nodejs-actions/setup@main
with:
    package-name: 'org.zowe.explorer-jes'
    nodejs-version: 'v10.18.1'
    install-registry-url: xxx
    install-registry-email: xxx
    install-registry-username: xxx
    install-registry-password: xxx
    publish-registry-email: xxx
    publish-registry-username: xxx
    publish-registry-password: xxx
```
To enable debug mode, add
```
env:
    DEBUG: 'zowe-actions:nodejs-actions:setup'
```
