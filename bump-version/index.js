const core = require('@actions/core')
const Registry = require('npm-registry')
const { InvalidArgumentException , github, utils } = require('zowe-common')
const Debug = require('debug')
const debug = Debug('zowe-actions:nodejs-actions:bump-version')

var branch = process.env.CURRENT_BRANCH
var repo = process.env.GITHUB_REPOSITORY
var baseDirectory = core.getInput('base-directory')
var version = core.getInput('version')
if (version == '') {
    version = 'PATCH'
}
console.log(utils.sh('pwd')) //debug
// get temp folder for cloning
var tempFolder = `.tmp-npm-registry-${utils.dateTimeNow()}`

console.log(`Cloning ${branch} into ${tempFolder} ...`)
// clone to temp folder
github.clone(repo,tempFolder,branch)

// run npm version
console.log(`Making a "${version}" version bump ...`)

var res
if (baseDirectory != '' && baseDirectory != '.') {
    // REF: https://github.com/npm/npm/issues/9111#issuecomment-126500995
    //      npm version not creating commit or tag in subdirectory [using given workaround]
    utils.sh(`cd ${tempFolder}/${baseDirectory} && mkdir -p .git`)
    res = utils.sh(`cd ${tempFolder}/${baseDirectory} && npm version ${version.toLowerCase()}`)
    
} else {
    res = utils.sh(`cd ${tempFolder} && npm version ${version.toLowerCase()}`)
}

if (res.includes('Git working directory not clean.')) {
    throw new Error('Working directory is not clean')
} else if (!res.match(/^v[0-9]+\.[0-9]+\.[0-9]+$/)) {
    throw new Error(`Bump version failed: ${res}`)
}

utils.sh(`cd ${tempFolder} && git rebase HEAD~1 --signoff && git add ${tempFolder}/ && git commit -s`)

// push version changes
console.log(`Pushing ${branch} to remote ...`)
github.push(repo, branch)
if (!github.isSynced()) {
    throw new Error('Branch is not synced with remote after npm version.')
}

// No need to clean up tempFolder, Github VM will get disposed