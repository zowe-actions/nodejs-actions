import { execSync } from 'child_process'
import fs from 'fs'
import semver from 'semver'

export function sh(cmd,debug) {
    if (debug) {
        console.log('Running $ '+cmd)
    }
    return execSync(cmd);
}

export function fileExists(path) {
    var err
    fs.access(path, fs.constants.F_OK, (err) => {
        if (err)
            console.log(`${path} does not exist`);
    });
    if (!err)
        return true
    else
        return false
}

export function parseSemanticVersion(version) {
    var versionMap = new Map()
    versionMap.set('major', semver.major(version))
    versionMap.set('minor', semver.minor(version))
    versionMap.set('patch', semver.patch(version))
    var prerelease = semver.prerelease(version)
    if (prerelease)
        versionMap.set('prerelease', ''+prerelease[0]+prerelease[1])
    return versionMap
}