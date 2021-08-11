# Setup action for Zowe NodeJS projects

This action does setup before building Zowe Nodejs projects. Specifically configuring install registries and publish registries and logging in.
<br />

## Inputs

#### `package-name`
**Required** - The name of the package
#### `nodejs-version`
**Required** - The version of nodejs to be used for building
#### `install-registry-url`
**Required** - Install registry URL
#### `install-registry-email`
**Required** - Install registry email
#### `install-registry-username`
**Required** - Install registry username
#### `install-registry-password`
**Required** - Install registry password
#### `install-registry-token-credential`
**Optional** - Install registry token credential (will prioritize token authentication if provided)
#### `publish-registry-email`
**Required** - Publish registry email
#### `publish-registry-username`
**Required** - Publish registry username
#### `publish-registry-password`
**Required** - Publish registry password
#### `publish-registry-token-credential`
**Optional** - Publish registry token credential (will prioritize token authentication if provided)
#### `always-use-npm-install`
**Optional** - Always to use `npm install`. Default `false`
#### `exit-if-folder-not-clean`
**Optional** - exit workflow if at the end git folder not clean
<br /><br />

## Outputs
None
<br />

## Exported environment variables 
(global env vars - for subsequent workflow steps to consume)
#### `PACKAGE_INFO` 
Selected infomation in package.json in JSON string format <br />
Example:
```
PACKAGE_INFO: {
    "name": "my-component",
    "description": "This is my component",
    "version": "1.0.16",
    "versionTrunks": {},
    "license": "EPL-2.0",
    "registry": "https://npm.registry",
    "scripts": [
      "dev",
      "test",
      "build"
    ]
}
```
<br />

## Example usage
(this is a minimal set of inputs you need to provide)
```
uses: zowe-actions/nodejs-actions/setup@main
with:
  package-name: 'org.zowe.mycomponent'
  nodejs-version: 'v1.0.23'   
  install-registry-url: 
  install-registry-email: 
  install-registry-username: 
  install-registry-password: 
  publish-registry-email: 
  publish-registry-username: 
  publish-registry-password: 
```
To enable debug mode, append
```
env:
  DEBUG: 'zowe-actions:nodejs-actions:setup'
```
