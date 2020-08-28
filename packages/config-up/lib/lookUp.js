const fs = require('fs');
const path = require('path');
const doExists = require('./doExists');

function lookUp(options) {
  const { cwd = process.cwd() } = options;
  const pathSegments = cwd.split(path.delimiter);

  do {
    const lwd = path.join(...pathSegments);
    const configPath = doExists({ ...options, cwd: lwd });

    if (configPath) {
      return configPath;
    }
  } while (pathSegments.pop());
}

module.exports = lookUp;
