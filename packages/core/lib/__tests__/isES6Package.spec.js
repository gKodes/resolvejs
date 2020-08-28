const { isES6Package, hasExportsOf } = require('../isES6Package');
const lookUpPkgSync = require('../lookUpPkgSync');
const readPkgSync = require('../readPkgSync');

jest.mock('../lookUpPkgSync', () => jest.fn(() => 'package.json'));
jest.mock('../readPkgSync', () => jest.fn());

describe('core/lib/isES6Package.isES6Package', () => {
  test('when package does not have module, type, resolveUsing & exports attributes should return false', () => {
    readPkgSync.mockReturnValueOnce({});
    expect(isES6Package('mock-false')).toBeFalsy();
  });

  test('when package does have module should return true', () => {
    readPkgSync.mockReturnValueOnce({ module: 'es/index.js' });
    expect(isES6Package('mock-module')).toBeTruthy();
  });

  test('when package does have type attributes eq `module` should return true', () => {
    readPkgSync.mockReturnValueOnce({ type: 'module' });
    expect(isES6Package('mock-type')).toBeTruthy();
  });

  test('when package does have resolveUsing attribute eq `import` should return true', () => {
    readPkgSync.mockReturnValueOnce({ resolveUsing: 'import' });
    expect(isES6Package('mock-resolveUsing')).toBeTruthy();
  });

  test('when package does have resolveUsing attribute neq `import` should return false', () => {
    readPkgSync.mockReturnValueOnce({ resolveUsing: false });
    expect(isES6Package('mock-resolveUsing')).toBeFalsy();
  });

  test('when package does have exports attributes should return true', () => {
    readPkgSync.mockReturnValueOnce({ exports: { '.': { import: './' } } });
    expect(isES6Package('mock-exports')).toBeTruthy();
  });
});

describe('core/lib/isES6Package.hasExportsOf', () => {
  test('when has type import defined and request for type import should return true', () => {
    expect(hasExportsOf({ '.': { import: './' } }, 'import')).toBeTruthy();
  });

  test('when has type import defined on any node and request for type import should return true', () => {
    expect(hasExportsOf({ root: { import: './es/root' } }, 'import')).toBeTruthy();
  });

  test('when has type import defined and request for type require should return false', () => {
    expect(hasExportsOf({ '.': { import: './' } }, 'require')).toBeFalsy();
  });

  test('when has type import defined on any node and request for type require should return true', () => {
    expect(hasExportsOf({ root: { import: './es/root' } }, 'require')).toBeFalsy();
  });
});
