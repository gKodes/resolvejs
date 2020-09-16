const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const knownConfigs = YAML.parse(
  fs.readFileSync(path.resolve(__dirname, '../known.yml'), {
    encoding: 'utf-8',
  })
);

module.exports = knownConfigs;
module.exports.getKnownConfig = function getKnownConfig(app) {
  return module.exports[app];
};

// Object.freeze(module.exports);
