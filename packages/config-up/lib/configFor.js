const assert = require('assert');
const knownConfigs = require('./knownConfigs');
const lookUp = require('./lookUp');
const asArray = require('./utils/asArray');

/**
 *
 * @param {ConfigForOptions} options
 */
function configFor(options) {
  assert.ok(options.app || options.config, 'Either opp or config should be provided');
  let lookUpOptions = { files: options.config, exts: options.ext };
  if (options.app) {
    const knowConfig = knownConfigs[options.app];
    assert.ok(knowConfig, `Unknown opp ${options.app}`);

    lookUpOptions = knowConfig;
  }

  lookUpOptions.files = asArray(lookUpOptions.files);
  return lookUp(lookUpOptions);
}

module.exports = configFor;
