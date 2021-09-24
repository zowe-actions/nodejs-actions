/*
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright IBM Corporation 2021
 */

const core = require('@actions/core')
const { utils } = require('zowe-common')
const Debug = require('debug')
const debug = Debug('zowe-actions:nodejs-actions:publish')
const DEFAULT_NPM_NON_RELEASE_TAG = 'snapshot'

var isReleaseBranch = `${ process.env.IS_RELEASE_BRANCH == 'true' ? true : false }`
var isPerformingRelease = `${ core.getInput('perform-release') == 'true' ? true : false }`
var packageInfo = process.env.PACKAGE_INFO ? JSON.parse(process.env.PACKAGE_INFO) : ''
if (packageInfo == '') {
    throw new Error('There is no environment variable PACKAGE_INFO, possibly meaning package.json is absent. Check any warning message in zowe-actions/nodejs-actions/setup')   
}
var npmPublishRegistry = packageInfo['registry']
if (!npmPublishRegistry || npmPublishRegistry == '') {
    throw new Error('There is no registry information within package.json, please fix it in package.json before doing a npm publish. publish registry information is mandatory')
}
var matchedBranch = utils.searchDefaultBranches()
var npmTag = ''
if (matchedBranch && isReleaseBranch && isPerformingRelease) {
    npmTag = matchedBranch.npmTag
}
if (!npmTag) {
    npmTag = DEFAULT_NPM_NON_RELEASE_TAG
}

console.log(`Publishing package v${process.env['PUBLISH_VERSION']} as tag ${npmTag}`)

/* Q: What is below revert doing?
 * A: First of all, all workflows run will initiate a npm publish which will upload to npm registry.
 *    However, the version will depend on what 'version' field specifies in package.json.
 *    When we are building a interim build (not official release), we don't want the version to be exact version number, eg. 1.0.2, 
 *    because it conflicts with the official release. Thus we want to make the interim build version to be the same as PUBLISH_VERSION.
 *    Note that PUBLISH_VERSION will be {version}{prerelease}{branchtag}{buildnumber}{timestamp} when NOT doing release; otherwise, it will be exact version number (same as P_VERSION)
 *    That's why below code does a $ npm version PUBLISH_VERSION first without commit to temporarily update the 'version' in package.json,
 *    then do a npm publish, later revert changes back.
 */
var revert = false
if (process.env.PUBLISH_VERSION != process.env.P_VERSION) { //P_VERSION will always be exact version number
    revert = true
}
debug(`Do we need to revert changes? ${revert}`)
var currentCommit
if (revert) {
    currentCommit = utils.sh('git rev-parse HEAD')
    debug(`current commit is ${currentCommit}`)
    // npm version without tag & commit
    // so this command just update package.json version to target version.
    debug(`Running $ npm version --no-git-tag-version ${process.env.PUBLISH_VERSION}`)
    debug(utils.sh(`npm version --no-git-tag-version ${process.env.PUBLISH_VERSION}`))
}
debug(`Running $ npm publish --tag ${npmTag} --registry ${npmPublishRegistry}`)
debug(utils.sh(`npm publish --tag ${npmTag} --registry ${npmPublishRegistry}`))

if (revert && currentCommit) {
    console.log('Revert changes by npm version ...')
    debug(`Running $ git reset --hard ${currentCommit}`)
    debug(utils.sh(`git reset --hard ${currentCommit}`))
    console.log('Revert done.')
}
console.log('npm publish done')