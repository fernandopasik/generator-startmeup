import { flatten } from '../answer';

describe('Answer', () => {
  describe('flatten', () => {
    it('handles empty answers', () => {
      expect({}).toStrictEqual({});
    });

    it('returns same answers when no nested', () => {
      const answers = {
        a: 'valueA',
        b: 'valueB',
      };

      const flattened = flatten(answers);

      expect(flattened).toStrictEqual(answers);
    });

    it('split nested answers', () => {
      const answers = {
        a: 'valueA',
        b: {
          c: 'valueC',
          d: 'valueD',
        },
        e: 'valueE',
      };

      const flattened = flatten(answers);

      expect(Object.keys(flattened)).toHaveLength(4);
    });

    it('split nested answers with composed names', () => {
      const answers = {
        a: 'valueA',
        b: {
          c: 'valueC',
          d: 'valueD',
        },
        e: 'valueE',
      };

      const flattened = flatten(answers);

      expect(flattened).toStrictEqual({
        a: 'valueA',
        'b.c': 'valueC',
        'b.d': 'valueD',
        e: 'valueE',
      });
    });

    it('split nested answers with more than 2 levels', () => {
      const answers = {
        a: 'valueA',
        b: {
          c: {
            d: 'valueD',
          },
          e: 'valueE',
        },
      };

      const flattened = flatten(answers);

      expect(flattened).toStrictEqual({
        a: 'valueA',
        'b.c.d': 'valueD',
        'b.e': 'valueE',
      });
    });
  });
});
