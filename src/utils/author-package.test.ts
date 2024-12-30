import assert from 'node:assert';
import { describe, it } from 'node:test';
import { composeAuthor, parseAuthor } from './author-package.ts';

describe('Author Package', () => {
  describe('parse Author', () => {
    describe('with single line input and', () => {
      it('with only name', () => {
        assert.deepStrictEqual(parseAuthor('John Doe'), { name: 'John Doe' });
      });

      it('with name and email', () => {
        assert.deepStrictEqual(parseAuthor('John Doe <john@doe.com>'), {
          email: 'john@doe.com',
          name: 'John Doe',
        });
      });

      it('with name and url', () => {
        assert.deepStrictEqual(parseAuthor('John Doe (https://johndoe.com)'), {
          name: 'John Doe',
          url: 'https://johndoe.com',
        });
      });

      it('with name, email and url', () => {
        assert.deepStrictEqual(parseAuthor('John Doe <john@doe.com> (https://johndoe.com)'), {
          email: 'john@doe.com',
          name: 'John Doe',
          url: 'https://johndoe.com',
        });
      });
    });

    it('keeps if input is object format', () => {
      const author = {
        email: 'john@doe.com',
        name: 'John Doe',
        url: 'https://johndoe.com',
      };

      assert.deepStrictEqual(parseAuthor(author), author);
    });

    it('with no input', () => {
      assert.deepStrictEqual(parseAuthor(), {});
    });
  });

  describe('to Author single line', () => {
    it('with only name', () => {
      assert.equal(composeAuthor({ name: 'John Doe' }), 'John Doe');
    });

    it('with name and email', () => {
      assert.equal(
        composeAuthor({ email: 'john@doe.com', name: 'John Doe' }),
        'John Doe <john@doe.com>',
      );
    });

    it('with name and url', () => {
      assert.equal(
        composeAuthor({ name: 'John Doe', url: 'https://johndoe.com' }),
        'John Doe (https://johndoe.com)',
      );
    });

    it('with name, email and url', () => {
      assert.equal(
        composeAuthor({ email: 'john@doe.com', name: 'John Doe', url: 'https://johndoe.com' }),
        'John Doe <john@doe.com> (https://johndoe.com)',
      );
    });

    it('with no input', () => {
      assert.equal(composeAuthor({}), '');
      assert.equal(composeAuthor(), '');
    });
  });
});
