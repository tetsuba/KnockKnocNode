#!usr/bin/env node
'use strict';
const fs = require('fs');
const semver = require('semver');
const { exec } = require("child_process");
const print = require('./lib/print');
const { externalPackage, combine } = require('./lib/utils')
const { compareProcessNodeWith } = require('./lib/external')

const nodeVersion = compareProcessNodeWith('package.json', ['engines', 'node'])

if (typeof nodeVersion === 'boolean' && nodeVersion) {
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

