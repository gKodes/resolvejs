const fs = require('fs');
const doExists = require('../doExists');

jest.mock('fs');

describe('config-up/lib/doExist', () => {
  it('when only files and cwd is passed should invoke fs.existsSync to check if the file exists in cwd', () => {
    doExists({
      files: ['babel.config.js'],
      cwd: '/mock/drive',
    });

    expect(fs.existsSync).toHaveBeenCalledWith('/mock/drive/babel.config.js');
  });

  it('when only exts are passed file should be append with ext and invoke fs.existsSync to check if the file exists in cwd', () => {
    fs.existsSync.mockReset();
    doExists({
      files: ['babel.config'],
      exts: ['js'],
      cwd: '/mock/drive',
    });

    expect(fs.existsSync).toHaveBeenCalledWith('/mock/drive/babel.config.js');
  });

  it('when file exists should return the complete path', () => {
    fs.existsSync.mockReturnValue(true);

    expect(
      doExists({
        files: ['babel.config'],
        exts: ['js'],
        cwd: '/mock/drive',
      })
    ).toBe('/mock/drive/babel.config.js');
  });
});
