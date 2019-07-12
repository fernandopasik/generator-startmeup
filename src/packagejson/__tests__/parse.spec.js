const parse = require('../parse');

describe('Parse package.json and get parameters', () => {
  describe('App Name', () => {
    test('from existing', () => {
      const name = 'example-app';
      const parsed = parse({ name });
      expect(parsed).toStrictEqual({ appName: name });
    });

    test('when not exist', () => {
      const parsed = parse({});
      expect(parsed).toStrictEqual({});
    });
  });

  describe('App Description', () => {
    test('from existing', () => {
      const description = 'Example app description';
      const parsed = parse({ description });
      expect(parsed).toStrictEqual({ appDescription: description });
    });

    test('when not exist', () => {
      const parsed = parse({});
      expect(parsed).toStrictEqual({});
    });
  });

  describe('Author Name', () => {
    test('when not exist', () => {
      const parsed = parse({});
      expect(parsed).toStrictEqual({});
    });

    describe('from string', () => {
      test('with only name', () => {
        const name = 'Example';
        const parsed = parse({ author: name });
        expect(parsed).toStrictEqual({ authorName: name });
      });

      test('with name and email', () => {
        const name = 'Example';
        const email = 'example@email.com';
        const parsed = parse({ author: `${name} <${email}>` });
        expect(parsed).toStrictEqual({ authorName: name, authorEmail: email });
      });

      test('with name and url', () => {
        const name = 'Example';
        const url = 'example.com';
        const parsed = parse({ author: `${name} (${url})` });
        expect(parsed).toStrictEqual({ authorName: name, authorUrl: url });
      });

      test('with name, email and url', () => {
        const name = 'Example';
        const email = 'example@email.com';
        const url = 'example.com';
        const parsed = parse({ author: `${name} <${email}> (${url})` });
        expect(parsed).toStrictEqual({ authorName: name, authorEmail: email, authorUrl: url });
      });
    });

    describe('from object', () => {
      test('with name', () => {
        const name = 'Example';
        const parsed = parse({ author: { name } });
        expect(parsed).toStrictEqual({ authorName: name });
      });

      test('without name', () => {
        const parsed = parse({ author: {} });
        expect(parsed).toStrictEqual({});
      });
    });
  });

  describe('Author Email', () => {
    test('from undefined', () => {
      const { authorEmail } = parse({});
      expect(authorEmail).toBeUndefined();
    });

    describe('from string', () => {
      test('with only name', () => {
        const name = 'Example';
        const { authorEmail } = parse({ author: name });
        expect(authorEmail).toBeUndefined();
      });

      test('with name and email', () => {
        const name = 'Example';
        const email = 'example@email.com';
        const { authorEmail } = parse({ author: `${name} <${email}>` });
        expect(authorEmail).toBe(email);
      });

      test('with name and url', () => {
        const name = 'Example';
        const url = 'example.com';
        const { authorEmail } = parse({ author: `${name} (${url})` });
        expect(authorEmail).toBeUndefined();
      });

      test('with name, email and url', () => {
        const name = 'Example';
        const email = 'example@email.com';
        const url = 'example.com';
        const { authorEmail } = parse({ author: `${name} <${email}> (${url})` });
        expect(authorEmail).toBe(email);
      });
    });

    describe('from object', () => {
      test('with email', () => {
        const email = 'example@email.com';
        const { authorEmail } = parse({ author: { email } });
        expect(authorEmail).toBe(email);
      });

      test('without email', () => {
        const { authorEmail } = parse({ author: {} });
        expect(authorEmail).toBeUndefined();
      });
    });
  });

  describe('Author Url', () => {
    test('from undefined', () => {
      const { authorUrl } = parse({});
      expect(authorUrl).toBeUndefined();
    });

    describe('from string', () => {
      test('with only name', () => {
        const name = 'Example';
        const { authorUrl } = parse({ author: name });
        expect(authorUrl).toBeUndefined();
      });

      test('with name and email', () => {
        const name = 'Example';
        const email = 'example@email.com';
        const { authorUrl } = parse({ author: `${name} <${email}>` });
        expect(authorUrl).toBeUndefined();
      });

      test('with name and url', () => {
        const name = 'Example';
        const url = 'example.com';
        const { authorUrl } = parse({ author: `${name} (${url})` });
        expect(authorUrl).toBe(url);
      });

      test('with name, email and url', () => {
        const name = 'Example';
        const email = 'example@email.com';
        const url = 'example.com';
        const { authorUrl } = parse({ author: `${name} <${email}> (${url})` });
        expect(authorUrl).toBe(url);
      });
    });

    describe('from object', () => {
      test('with email', () => {
        const url = 'example.com';
        const { authorUrl } = parse({ author: { url } });
        expect(authorUrl).toBe(url);
      });

      test('without email', () => {
        const { authorUrl } = parse({ author: {} });
        expect(authorUrl).toBeUndefined();
      });
    });
  });

  describe('Github Confirm', () => {
    test('from undefined repository', () => {
      const { githubConfirm } = parse({});
      expect(githubConfirm).toBeUndefined();
    });

    describe('from string repository', () => {
      test('is a github url', () => {
        const repository = 'https://github.com/example/example';
        const { githubConfirm } = parse({ repository });
        expect(githubConfirm).toBe(true);
      });

      test('is not a github url', () => {
        const repository = 'https://gitlab.com/example/example';
        const { githubConfirm } = parse({ repository });
        expect(githubConfirm).toBe(false);
      });
    });

    describe('from object repository', () => {
      test('is a github url', () => {
        const url = 'https://github.com/example/example';
        const { githubConfirm } = parse({ repository: { url } });
        expect(githubConfirm).toBe(true);
      });

      test('is not a github url', () => {
        const url = 'https://gitlab.com/example/example';
        const { githubConfirm } = parse({ repository: { url } });
        expect(githubConfirm).toBe(false);
      });
    });
  });

  describe('Github Url', () => {
    test('from undefined repository', () => {
      const { githubUrl } = parse({});
      expect(githubUrl).toBeUndefined();
    });

    test('from string repository', () => {
      const repository = 'https://github.com/example/example';
      const { githubUrl } = parse({ repository });
      expect(githubUrl).toBe(repository);
    });

    test('from object repository', () => {
      const url = 'https://github.com/example/example';
      const { githubUrl } = parse({ repository: { url } });
      expect(githubUrl).toBe(url);
    });

    test('from string git repository url', () => {
      const url = 'https://github.com/example/example';
      const repository = `${url}.git`;
      const { githubUrl } = parse({ repository });
      expect(githubUrl).toBe(url);
    });
  });

  describe('License', () => {
    test('from existing', () => {
      const license = 'example-app';
      const parsed = parse({ license });
      expect(parsed).toStrictEqual({ license });
    });

    test('when not exist', () => {
      const parsed = parse({});
      expect(parsed).toStrictEqual({});
    });
  });
});
