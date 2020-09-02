const configForSync = require('@resolvejs/config-up/lib/configFor');

describe('babel/bin/node-babel', () => {
  let exitSpy;
  // const argv = cli(cwd).parse(['args']);
  beforeAll(() => {
    process.exit = jest.fn();
    exitSpy = jest.spyOn(process, 'exit');
    exitSpy.mockImplementation((code) => {
      throw new Error(code);
    });
  });

  afterEach(() => {
    jest.resetModules();
  });

  afterAll(() => exitSpy.mockRestore());
  it('needs tests', () => {
    expect(() => {
      const nodeBabel = require('../node-babel');
    }).toThrow();
  });
});
