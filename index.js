#!usr/bin/env node
'use strict';
const fs = require('fs');
const semver = require('semver');
const { exec } = require("child_process");
const print = require('./print')

function getNodeVersionFromFile() {
  // TODO: handle errors
  const rawData = fs.readFileSync('package.json');
  const json = JSON.parse(rawData);
  const nodeVer = json.engines.node

  if (Object.hasOwn(json, 'engines')) {
    if(semver.valid(semver.coerce(nodeVer))) {
      print('msg', 'package.json node property is a valid version')
      return nodeVer
    }
    print('error', 'package.json node property not valid')
    return null
  }

  print('error', 'package.json missing property "engines"')
  return null
}

function getProcessingNodeVersion() {
  return process.version
}


function compareNodeVersions() {
  const file = getNodeVersionFromFile()
  const pv = getProcessingNodeVersion()
  const satisfied = semver.satisfies(pv, file)

  if (satisfied) {
    return satisfied
  }
  print('msg', 'node version do not match.')
  return file
}


const nodeVersion = compareNodeVersions()

if (typeof nodeVersion === 'boolean') {
  print('msg', 'Processing correct node version.')
} else {

  execNodeManager("sudo n --version", function (valid) {
    if (valid) {
      execNodeManager("n " + nodeVersion)
    }
  })
}


function execNodeManager(command, cb) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      process.exit(1)
      return false;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      process.exit(1)
      return false;
    }
    console.log(`stdout: ${stdout}`);
    cb(stdout);
  });
}


