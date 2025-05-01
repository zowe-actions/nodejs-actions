const core = require('@actions/core')
const actionsGithub = require('@actions/github')
const { github, utils } = require('zowe-common')
const Debug = require('debug')
const debug = Debug('zowe-actions:nodejs-actions:bump-version')
var noNeedBumpVersion = core.getInput('NO_NEED_BUMP_VERSION') ? true : false
if (noNeedBumpVersion) {
    // do nothing, skip this action
    console.warn(```You may have accidentally triggered this bump-version action. 
According to the result from shared-actions/release, conditions are not satisfied to bump version.
Condition to run bump-version are IS_FORMAL_RELEASE_BRANCH == 'true' AND PRE_RELEASE_STRING == ''
Thus, skip this action run.
```)
} 
else {
    var branch = process.env.CURRENT_BRANCH
    var repo = actionsGithub.context.repo.owner + '/' + actionsGithub.context.repo.repo
    var baseDirectory = core.getInput('base-directory')
    var version = core.getInput('version')
    if (version == '') {
        version = 'PATCH'
    }

    // get temp folder for cloning
    var tempFolder = `${process.env.RUNNER_TEMP}/.tmp-npm-registry-${utils.dateTimeNow()}`

    console.log(`Cloning ${branch} into ${tempFolder} ...`)
    // clone to temp folder
    github.clone(repo,tempFolder,branch)

    // run npm version
    console.log(`Making a "${version}" version bump ...`)

    var res
    var manifest
    var newVersion
    if (baseDirectory != '' && baseDirectory != '.') {
        workdir += `/${baseDirectory}`
    }
    if (utils.fileExists(workdir + '/manifest.yaml')) {
        manifest = 'manifest.yaml'
    } else if (utils.fileExists(workdir + '/manifest.yml')) {
        manifest = 'manifest.yml'
    } else if (utils.fileExists(workdir + '/manifest.json')) {
        console.log('Manifest is a JSON file. Bump version not supported yet. Skipping...')
        manifest = null
    } else {
        console.log('No manifest file found. Skipping version bump.')
        manifest = null
    }
    if (manifest) {
        newVersion = utils.bumpManifestVersion(`${workdir}/${manifest}`, version)
        console.log('New version:', newVersion)
        github._cmd(tempFolder, 'status');
        github._cmd(tempFolder, 'diff');
        github.add(workdir, manifest)
    }
	
    if (baseDirectory != '' && baseDirectory != '.') {
        // REF: https://github.com/npm/npm/issues/9111#issuecomment-126500995
        //      npm version not creating commit or tag in subdirectory [using given workaround]
        utils.sh(`cd ${tempFolder}/${baseDirectory} && mkdir -p .git`)
        res = utils.sh(`cd ${tempFolder}/${baseDirectory} && npm version ${version.toLowerCase()}`)
        
    } else {
        res = utils.sh(`cd ${tempFolder} && npm version ${version.toLowerCase()}`)
    }
    console.log(res)
    if (res.includes('Git working directory not clean.')) {
        throw new Error('Working directory is not clean')
    } else if (!res.match(/^v[0-9]+\.[0-9]+\.[0-9]+$/)) {
        throw new Error(`Bump version failed: ${res}`)
    }

    console.log(utils.sh(`cd ${tempFolder} && git rebase HEAD~1 --signoff`))

    // push version changes
    console.log(`Pushing ${branch} to remote ...`)
    github.push(branch, tempFolder, actionsGithub.context.actor, process.env.GITHUB_TOKEN, repo)
    if (!github.isSync(branch, tempFolder)) {
        throw new Error('Branch is not synced with remote after npm version.')
    }

    // No need to clean up tempFolder, Github VM will get disposed
}