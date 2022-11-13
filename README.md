# KnockKnockNode

Checks which node version is running and compares it with the node version
documented in the package.json. 

If the versions match then the app will continue.

If not then a series of checks will be done and then install the correct version 

---
### Dependencies 
[ n ] node package manager is required for this to work
link [https://github.com/tj/n](https://github.com/tj/n)


## Example

---
#### Node Script
```
  "scripts": {
    "preinstall": "node knockKnockNode",
    "prestart": "node knockKnockNode",
    "start": "node index"
  },
```

#### Shell Script
```
  "scripts": {
    "preinstall": "./knockKnockNode.sh",
    "prestart": "./knockKnockNode.sh",
    "start": "node index"
  },
```


The n command downloads and installs to /usr/local by default, but you may override this location by defining N_PREFIX. n caches Node.js versions in subdirectory n/versions. The active Node.js version is installed in subdirectories bin, include, lib, and share.

To avoid requiring sudo for n and npm global installs, it is suggested you either install to your home directory using N_PREFIX, or take ownership of the system directories:

```
sudo chown -R $(whoami) /usr/local/n
sudo chown -R $(whoami) /usr/local/bin /usr/local/lib /usr/local/include /usr/local/share
```
[https://www.npmjs.com/package/n](https://www.npmjs.com/package/n)


https://blog.greenkeeper.io/introduction-to-version-ranges-e0e8c6c85f0f

---

### Future implementations
 - Look to implement other node package mangers
 - Version look-ups 
