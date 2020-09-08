var fs = require('fs');
var { resolve } = require('@resolvejs/core/lib');
var builtinModules = require('builtin-modules');
var findNodeModules = require('find-node-modules');
var path = require('path');

var log = require('debug')('eslint-plugin-import:resolver:resolvejs');

exports.interfaceVersion = 2;

exports.resolve = function (source, file, config) {
  log('Resolving:', source, 'from:', file);
  var resolvedPath;

  if (builtinModules.includes(source)) {
    log('resolved to core');
    return { found: true, path: null };
  }

  try {
    resolvedPath = resolve(source, {
      target: 'import', //isES6Package(parentModule.id) ? 'import' : 'require',
      paths: findNodeModules({
        cwd: fs.lstatSync(file).isDirectory() ? file : path.dirname(file),
        relative: false,
      }),
    });
    resolvedPath = require.resolve(resolvedPath);
    log('Resolved to:', resolvedPath);

    if (fs.existsSync(resolvedPath)) {      
      log(resolvedPath, 'Resolved Path exists');
      return {
        found: true,
        path: resolvedPath,
      };
    }
  } catch (err) {
    log('resolve threw error:', err);
  }
  log('unable to resolve:', source);
  return { found: false };
};

