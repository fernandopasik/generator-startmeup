import {
  generateCoveragePattern,
  generateFilename,
  generateTransformPattern,
} from '../jest-config';

describe('jest config', () => {
  describe('generate coverage pattern', () => {
    it('js', () => {
      expect(generateCoveragePattern()).toStrictEqual('src/**/*.js');
    });

    it('ts', () => {
      expect(generateCoveragePattern(true)).toStrictEqual('src/**/*.{j,t}s');
    });

    it('js and react', () => {
      expect(generateCoveragePattern(false, true)).toStrictEqual('src/**/*.js{,x}');
    });

    it('ts and react', () => {
      expect(generateCoveragePattern(true, true)).toStrictEqual('src/**/*.{j,t}s{,x}');
    });
  });

  describe('generate transform pattern', () => {
    it('js', () => {
      expect(generateTransformPattern()).toStrictEqual('^.+\\.js$');
    });

    it('ts', () => {
      expect(generateTransformPattern(true)).toStrictEqual('^.+\\.[j|t]s$');
    });

    it('js and react', () => {
      expect(generateTransformPattern(false, true)).toStrictEqual('^.+\\.jsx?$');
    });

    it('ts and react', () => {
      expect(generateTransformPattern(true, true)).toStrictEqual('^.+\\.[j|t]sx?$');
    });
  });

  describe('generate filename', () => {
    it('for non module type package', () => {
      expect(generateFilename()).toStrictEqual('jest.config.js');
    });

    it('for module type package', () => {
      expect(generateFilename(true)).toStrictEqual('jest.config.cjs');
    });
  });
});
