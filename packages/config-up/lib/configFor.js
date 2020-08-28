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
  if (options.app) {
    assert.ok(knownConfigs[options.app], `Unknown opp ${options.app}`);
  }

  const config = asArray(options.config || knownConfigs[options.app].configs);
  return lookUp({ files: config });
}

module.exports = configFor;
