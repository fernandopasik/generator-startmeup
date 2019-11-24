import { flatObject, unflatObject } from '../utils';

describe('utils', () => {
  describe('flat object', () => {
    it('with undefined', () => {
      expect(flatObject()).toBeUndefined();
    });

    it('with empty object', () => {
      expect(flatObject({})).toStrictEqual({});
    });

    it('with not nested object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(flatObject(obj)).toStrictEqual(obj);
    });

    it('with nested object', () => {
      expect(
        flatObject({
          a: 1,
          b: 2,
          c: {
            d: 3,
            e: {
              f: 4,
            },
          },
        }),
      ).toStrictEqual({
        a: 1,
        b: 2,
        'c.d': 3,
        'c.e.f': 4,
      });
    });
  });

  describe('unflat object', () => {
    it('with undefined', () => {
      expect(unflatObject()).toBeUndefined();
    });

    it('with empty object', () => {
      expect(unflatObject({})).toStrictEqual({});
    });

    it('with not nested object', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(unflatObject(obj)).toStrictEqual(obj);
    });

    it('with nested object', () => {
      expect(
        unflatObject({
          a: 1,
          b: 2,
          'c.d.e': 3,
          'c.d.f': 4,
          'c.g': 5,
        }),
      ).toStrictEqual({
        a: 1,
        b: 2,
        c: {
          d: {
            e: 3,
            f: 4,
          },
          g: 5,
        },
      });
    });
  });
});
