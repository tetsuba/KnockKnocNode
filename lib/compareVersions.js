const fs = require('fs')
const semver = require('semver');
const { externalPackage, combine, ternaryCurried, compose } = require('./utils')
const print = require('./print')

/**
 * @function 
 * @name readJsonFile
 * @param { fs } fileReader
 * @param { string } filePath
 * @return {undefined|any}
 */
function readJsonFile(fileReader, filePath) {
  try {
    const rawData = fileReader.readFileSync(filePath);
    const json = JSON.parse(rawData);
    return json
  } catch(error) {
    return undefined
  }
}

/**
 * @function
 * @name getPropertyValue
 * @param { json } json
 * @param { string[] } ary
 * @return { string | undefined }
 */
function getPropertyValue(json, ary) {
  return ary.reduce((j, property) => j ? j[property] : undefined, json)
}

/**
 * @function
 * @name compareNodeVersions
 * @param { semver } semantic
 * @param { string } runningVersion
 * @return { (requiredVersion: string) => boolean | string }
 */
function compareNodeVersions(semantic, runningVersion) {
  return function compare(requiredVersion) {
    const satisfied = semantic.satisfies(runningVersion, requiredVersion)
    return satisfied
      ? satisfied
      : requiredVersion.replace(/[=<>~^*]/g, '').replace('x', '0')
  }
}

/**
 * @function
 * @name exit
 * @param { process } p
 * @param { string } msg
 * @return { () => void }
 */
function exit(p, msg) {
  return function() {
    print('error', msg)
    p.exit(1)
  }
}

/**
 * External packages
 * - process
 * - fs
 * - sever
 */
const exitNode = externalPackage(process, exit)
const getJsonFile = externalPackage(fs, readJsonFile)
const compareVersions = externalPackage(semver, compareNodeVersions)

/**
 * Attaching error messages and process.exit
 */
const maybeFileMissing = ternaryCurried(exitNode('package.json file missing!'))
const maybePopertyMissing = ternaryCurried(exitNode('node version cannot be found in package.json [engines.node]'))

/**
 * Wrapping functions with error handling
 */
const jsonFile = maybeFileMissing(getJsonFile)
const propertyValue = maybePopertyMissing(getPropertyValue)


const getNodeVersionFromFile = combine(jsonFile, propertyValue)
const compareWithProcessNode = compareVersions(process.version)
const compareProcessNodeWith = compose(compareWithProcessNode, getNodeVersionFromFile)






module.exports = { readJsonFile, getPropertyValue, compareNodeVersions, compareProcessNodeWith }