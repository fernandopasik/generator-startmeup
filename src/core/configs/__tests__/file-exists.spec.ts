import fileExists from '../file-exists';

describe('file exists', () => {
  it('returns true when file exists', () => {
    expect(fileExists('package.json')).toBe(true);
  });

  it('returns false when file does not exist', () => {
    expect(fileExists('example.js')).toBe(false);
  });
});
