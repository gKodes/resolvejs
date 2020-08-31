const fs = require('fs');
const path = require('path');
const upath = require('upath');
const BuiltinModule = require('module');
// const { cosmiconfigSync } = require('cosmiconfig');
// const { getInstalledPathSync, readPkgSync, getMainFileSync } = require('./utils/package');
const readJSON = require('./utils/readJSON');
const { lookUpPkgSync } = require('./lib/lookUpPkgSync');
const { isES6Package } = require('./lib/isES6Package');
const { resolve } = require('./lib');

// Guard against poorly mocked module constructors
const Module = module.constructor.length > 1 ? module.constructor : BuiltinModule;

const PATH_RESOLVE_DEFAULT = ['.', '/', '\\'];
// const SELF_NODE_MODULES = path.resolve(lookUpPkgSync(__dirname), 'node_modules');

/**
 *
 * @param {string} request
 * @param {Module} parentModule
 * @param {boolean} isMain
 * @param {object} options
 */
// eslint-disable-next-line no-underscore-dangle
const _resolveFilename = (() => {
  // eslint-disable-next-line no-shadow
  const resolveFilename = Module._resolveFilename;

  return function resolveByMainFields(request, parentModule, isMain, options) {
    // console.info('--resolveByMainFields--', parentModule.id, request);
    const absolutePath = path.resolve(path.basename(parentModule.filename), request);

    // If its not the main js and no potions and its not an relative path and if the module was not requested by any @babel modules
    if (!(isMain || options || PATH_RESOLVE_DEFAULT.includes(request[0]))) {
      // TODO: Find a way to pass in options

      // console.info(parentModule.id, isES6Package(parentModule.id));
      const resolvedPath = resolve(request, {
        target: isES6Package(parentModule.id) ? 'import' : 'require',
        // SELF_NODE_MODULES is the last path where things are search for
        paths: parentModule.paths,
      });

      if (resolvedPath) {
        return resolveFilename(resolvedPath, parentModule, isMain, options);
      }
    }

    // console.info('--absolutePath--', request, parentModule.id);
    return resolveFilename(...arguments);
  };
})();

/**
 *
 * @param {string} request
 * @param {Module} parentModule
 * @param {boolean} isMain
 * @param {object} options
 */
function resolveFilename(request, parentModule, isMain, options) {
  // console.info('resolveTo', request);
  return _resolveFilename(request, parentModule, isMain, options);
}

module.exports = resolveFilename;
