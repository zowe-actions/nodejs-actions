# Bump version action for Zowe NodeJS projects

This action bumps up package version for Zowe NodeJS projects in a separate cloned repository branch, then push changes into the branch.
#### Note:
This action must be run AFTER [zowe-actions/shared-actions/release](https://github.com/zowe-actions/shared-actions/tree/main/release) is finished.
<br /><br />

## Inputs
#### `github-user`
**[Required]** The github user to be used to do `git push`
#### `github-passwd`
**[Required]** The password associated with the github user provided above
#### `base-directory`
**[Optional]** The directory of where `npm version` command will be run. Only needed if command is NOT run in the root directory of the project
#### `version`
**[Optional]** The argument for command `npm version`. Default `patch`
<br /><br />

## Outputs
None
<br /><br />

## Exported environment variables 
(global env vars - for subsequent workflow steps to consume)\
None
<br /><br />

## Example usage
(this is a minimal set of inputs you need to provide)
```
uses: zowe-actions/nodejs-actions/bump-version@main
with:
  github-user:
  github-passwd:
```
To enable debug mode, append
```
env:
  DEBUG: 'zowe-actions:nodejs-actions:bump-version'
```
