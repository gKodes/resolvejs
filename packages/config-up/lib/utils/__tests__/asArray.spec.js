const asArray = require('../asArray');

describe('config-up/lib/utils/asArray', () => {
  test('when nothing is passed should return undefined', () => {
    expect(asArray()).toBeUndefined();
  });

  test('when the source is not an array should return a array with source as element', () => {
    const source = 'source';
    expect(asArray(source)).toContain(source);
  });

  test('when the source is a array should return it as-is', () => {
    const source = [];
    expect(asArray(source)).toBe(source);
  });
});
