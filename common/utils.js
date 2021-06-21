import { execSync } from 'child_process'
import fs from 'fs'
import semver from 'semver'

export function sh(cmd,debug) {
    if (debug) {
        console.log('Running $ '+cmd)
    }
    return execSync(cmd).toString().trim()
}

export function fileExists(path) {
    try {
        fs.accessSync(path, fs.constants.F_OK)
        console.log(path+' does exist')
        return true
    } catch {
        console.error(path+' does not exist')
        return false
    }
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

export function nvmShellInit(nodeJsVersion) {
    var nvmScript = process.env.HOME + '/.nvm/nvm.sh'
    var cmds = new Array()
    cmds.push('set +x')
    cmds.push('. '+nvmScript)
    cmds.push('nvm install '+nodeJsVersion)
    cmds.push('npm install npm -g')
    cmds.push('npm install yarn -g')
    cmds.push('npm install ci -g')
    return this.sh(cmds.join(';'))
}

export function nvmShell(nodeJsVersion, scripts) {
    var nvmScript = process.env.HOME + '/.nvm/nvm.sh'
    var cmds = new Array()
    cmds.push('set +x')
    cmds.push('. '+nvmScript)
    cmds.push('nvm use '+nodeJsVersion)
    cmds.push('set -x')
    scripts.forEach((x, i) => {
        cmds.push(x)
    });
    return this.sh(cmds.join(';'))
}