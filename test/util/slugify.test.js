const {slugify} = require('../../src/util/slugify');


describe('Slugify', () => {
  test('Should generate the right slug', () => {
    expect(slugify('test a')).toBe('test-a');
    expect(slugify('Test A')).toBe('test-a');
    expect(slugify('Test 1')).toBe('test-1');
    expect(slugify('Test')).toBe('test');
    expect(slugify('Test  ')).toBe('test');
    expect(slugify('Test_A')).toBe('test-a');
    expect(slugify('Test_A!')).toBe('test-a');
    expect(slugify('1_Test')).toBe('1-test');
    expect(slugify('!_Test')).toBe('test');
  });

  test('Should generate an empty slug', () => {
    expect(slugify('!')).toBe('');
    expect(slugify(' ')).toBe('');
    expect(slugify('')).toBe('');
  });
});
