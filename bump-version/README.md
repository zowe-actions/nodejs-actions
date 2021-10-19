# Bump version action for Zowe NodeJS projects

This action bumps up package version for Zowe NodeJS projects in a separate cloned repository branch, then push changes into the branch.

<br /><br />

## Inputs
#### `base-directory`
**Optional** - The directory of where `npm version` command will be run. Only needed if command is NOT run in the root directory of the project
#### `version`
**Optional** - The argument for command `npm version`. Default `patch`
<br /><br />

## Outputs
None
<br /><br />

## Exported environment variables 
(global env vars - for subsequent workflow steps to consume)\
None
<br /><br />

## Pre-requisite

- Before you call this action, make sure you call [shared-actions/prepare-workflow](https://github.com/zowe-actions/shared-actions/tree/main/prepare-workflow). Sample usage would be:

    ```yaml
    uses: zowe-actions/shared-actions/prepare-workflow@main
    ```

- This action must also be run after [shared-actions/release](https://github.com/zowe-actions/shared-actions/tree/main/release) is finished. Sample usage would be:

    ```yaml
    uses: zowe-actions/shared-actions/release@main
    ```

## Example usage
(this is a minimal set of inputs you need to provide)
```
uses: zowe-actions/nodejs-actions/bump-version@main
```
To enable debug mode, append
```
env:
  DEBUG: 'zowe-actions:nodejs-actions:bump-version'
```
