import { composeAuthor, parseAuthor } from './author-package.js';

describe('Author Package', () => {
  describe('parse Author', () => {
    describe('with single line input and', () => {
      it('with only name', () => {
        expect(parseAuthor('John Doe')).toStrictEqual({ name: 'John Doe' });
      });

      it('with name and email', () => {
        expect(parseAuthor('John Doe <john@doe.com>')).toStrictEqual({
          email: 'john@doe.com',
          name: 'John Doe',
        });
      });

      it('with name and url', () => {
        expect(parseAuthor('John Doe (https://johndoe.com)')).toStrictEqual({
          name: 'John Doe',
          url: 'https://johndoe.com',
        });
      });

      it('with name, email and url', () => {
        expect(parseAuthor('John Doe <john@doe.com> (https://johndoe.com)')).toStrictEqual({
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

      expect(parseAuthor(author)).toStrictEqual(author);
    });

    it('with no input', () => {
      expect(parseAuthor()).toStrictEqual({});
    });
  });

  describe('to Author single line', () => {
    it('with only name', () => {
      expect(composeAuthor({ name: 'John Doe' })).toBe('John Doe');
    });

    it('with name and email', () => {
      expect(composeAuthor({ email: 'john@doe.com', name: 'John Doe' })).toBe(
        'John Doe <john@doe.com>',
      );
    });

    it('with name and url', () => {
      expect(composeAuthor({ name: 'John Doe', url: 'https://johndoe.com' })).toBe(
        'John Doe (https://johndoe.com)',
      );
    });

    it('with name, email and url', () => {
      expect(
        composeAuthor({ email: 'john@doe.com', name: 'John Doe', url: 'https://johndoe.com' }),
      ).toBe('John Doe <john@doe.com> (https://johndoe.com)');
    });

    it('with no input', () => {
      expect(composeAuthor({})).toBe('');
      expect(composeAuthor()).toBe('');
    });
  });
});
