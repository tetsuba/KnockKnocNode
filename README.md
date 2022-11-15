# KnockKnockNode

Checks which node version is running and compares it with the node version
documented in the package.json. If the versions matches, then the app will continue
to install or run. If not, it will try to switch or install the correct version 
using n.

This package it dependent on [ n ](https://github.com/tj/n) to be installed.

---
### Dependencies 
[ n ] node package manager is required for this to work
link [https://github.com/tj/n](https://github.com/tj/n)


## Example

---
#### package.json
```
  "engines": {
    "node": ">=16.17.1"
  },
  "scripts": {
    "preinstall": "knockKnockNode",
    "prestart": "knockKnockNode",
    "start": "node index"
  },
```


---
## Required steps 
The n command downloads and installs to /usr/local by default, but you may override this location by defining N_PREFIX. n caches Node.js versions in subdirectory n/versions. The active Node.js version is installed in subdirectories bin, include, lib, and share.

To avoid requiring sudo for n and npm global installs, it is suggested you either install to your home directory using N_PREFIX, or take ownership of the system directories:

```
sudo chown -R $(whoami) /usr/local/n
sudo chown -R $(whoami) /usr/local/bin /usr/local/lib /usr/local/include /usr/local/share
```
[https://www.npmjs.com/package/n](https://www.npmjs.com/package/n)

---
## Semantic for node
Read the documentation to understand the version ranges that can be used.

[www.npmjs.com/package/semver](https://www.npmjs.com/package/semver)

