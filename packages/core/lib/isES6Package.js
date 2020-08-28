const lookUpPkgSync = require('./lookUpPkgSync');
const readPkgSync = require('./readPkgSync');

function isES6Package(srcPath) {
  const packageSrc = lookUpPkgSync(srcPath);

  if (packageSrc) {
    const { module, type, exports, resolveUsing } = readPkgSync(packageSrc);

    return module ||
      'module' === type ||
      resolveUsing === 'import' ||
      (typeof exports === 'object' && hasExportsOf(exports, 'import'))
      ? true
      : false;
  }

  return false;
}

function hasExportsOf(exports, type) {
  const rootExport = exports['.'] || exports['./'];
  if (rootExport) {
    return typeof rootExport === 'object' && rootExport[type] ? true : false;
  }

  return Object.keys(exports).find((exportPath) => {
    let exportsAs = exports[exportPath];
    return typeof exportsAs === 'object' && exportsAs[type];
  }) || false;
}

module.exports = { isES6Package: isES6Package, hasExportsOf: hasExportsOf };
