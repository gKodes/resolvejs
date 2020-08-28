const fs = require('fs');
const path = require('path');

EMPTY_STR = '';

/**
 *
 * @param {DoExistsOptions} options
 */
function doExists(options) {
  const { files, exts = [EMPTY_STR], cwd } = options;
  for (let pdx = 0; pdx < files.length; pdx++) {
    for (let edx = 0; edx < exts.length; edx++) {
      const fileName = files[pdx] + (exts[edx] && `.${exts[edx]}`);
      const probablePath = path.join(cwd, fileName);
      if (fs.existsSync(probablePath)) {
        return probablePath;
      }
    }
  }
}

module.exports = doExists;
