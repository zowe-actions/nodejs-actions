# Setup action for Zowe NodeJS projects

This action mainly does `npm publish` command to publish to npm registry as defined in package.json

## Inputs

### `perform-release`

**Optional** - The flag to indicate if doing performing release. If not provided, default to false.  

## Outputs

None  

## Exported environment variables

None

## Example usage

(this is a minimal set of inputs you need to provide)

```yaml
uses: zowe-actions/nodejs-actions/publish@main
with:
  perform-release:
```

To enable debug mode, append

```yaml
env:
  DEBUG: 'zowe-actions:nodejs-actions:publish'
```
