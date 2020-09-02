#!/usr/bin/env node
'use strict';

const path = require('path');
const { cosmiconfigSync } = require('cosmiconfig');
const { lookUpPkgSync, readPkgSync } = require('@resolvejs/core/lib');
const { isES6Package } = require('@resolvejs/core/lib/isES6Package');
let configForSync;

try {
  configForSync = require('@resolvejs/config-up/lib/configFor');
} catch (errNoConfig) {
  console.info('unable to find config-up module in the lookup tree', module.paths);
}

// Config up
const babelrc = require(configForSync({ app: 'babel' }));

if (!babelrc) {
  console.info('Unable to find babel config');
  process.exit(1);
}

// NOTE: Its true by default and should be true for webpack builds, in dev we need it to be false
babelrc.presets[0][1].modules = 'auto';
babelrc.plugins[babelrc.plugins.length - 1][1].useESModules = false;

const es6Packages = {};

//  require('ignore-styles');

//TODO: Create a cache for the ES6 Package's
function isNotES6Package(requestedPath) {
  const isES6 =
    es6Packages[
      Object.keys(es6Packages).find((cachePkgPath) => {
        const isES6 = requestedPath.startsWith(cachePkgPath);

        if (isES6) {
          const requestSubPath = path.relative(cachePkgPath, requestedPath);
          return !requestSubPath.startsWith('node_modules');
        }

        return isES6;
      })
    ];

  if (typeof isES6 === 'undefined') {
    const pkgPath = lookUpPkgSync(requestedPath);

    if (pkgPath) {
      // If package.module or pacjage.type is defined then its an ES6 Module and cannot be ignored
      // console.info('--packageJSON.name--', pkgPath, isES6Package(pkgPath));
      return (es6Packages[pkgPath] = !isES6Package(pkgPath));
    }
  }

  return isES6;
}

require('@babel/register')({
  ignore: [isNotES6Package],
  sourceType: 'unambiguous',
  presets: babelrc.presets,
  plugins: babelrc.plugins,
  env: babelrc.env,
  cache: false,
});

require('@resolvejs/core/register');

/*
-r stuff
if (Array.isArray(resolveBabelConfig.requires)) {
  const { requires } = resolveBabelConfig;

  requires.forEach((requireModule) => {
    require(requireModule);
  });
}
*/

require(path.resolve(process.argv[2]));
