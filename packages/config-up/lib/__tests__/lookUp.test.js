const lookUp = require('../lookUp');
const doExists = require('../doExists');

jest.mock('../doExists', () => jest.fn());

describe('config-up/lib/lookUp', () => {
  let cwdSpy;
  beforeAll(() => {
    cwdSpy = jest.spyOn(process, 'cwd');
  });

  afterAll(() => cwdSpy.mockRestore());

  it('should invoke doExists till it walks up to the root', () => {
    cwdSpy.mockReturnValue('/mock/drive');
    lookUp({ files: [ 'mock.config.js' ] });
    expect(doExists).toHaveBeenCalledTimes(2);
  });
});
