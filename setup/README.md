# Setup action for Zowe NodeJS projects

This action does setup before building Zowe Nodejs projects. Specifically configuring install registries and publish registries and logging in.
<br />

## Inputs
#### `package-name`
**Required** - The name of the package
#### `working-directory`
**Optional** - the directory of where to run action
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
#### `P_VERSION`
Project/package version number. Will overwrite `P_VERSION` produced at [P_VERSION](https://github.com/zowe-actions/shared-actions/tree/main/prepare-workflow#p_version)
<br />

## Example usage
(this is a minimal set of inputs you need to provide)
```
uses: zowe-actions/nodejs-actions/setup@main
with:
  package-name: 'org.zowe.mycomponent' 
  install-registry-url: https://myown-registry.com
  install-registry-email: install-user@example.org
  install-registry-username: i-user
  install-registry-password: i-passwd
  publish-registry-email: publish-user@example.org
  publish-registry-username: p-user
  publish-registry-password: p-passwd
```
To enable debug mode, append
```
env:
  DEBUG: 'zowe-actions:nodejs-actions:setup'
```
