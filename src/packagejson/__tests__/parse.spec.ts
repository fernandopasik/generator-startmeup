import parse from '../parse';

const minimumPkg = {
  name: 'example-app',
  version: 'none',
};

const minimumParsed = {
  name: 'example-app',
  version: 'none',
  github: false,
}

describe('Parse package.json and get', () => {
  test('name', () => {
    const name = 'example-app';
    const parsed = parse({ ...minimumPkg, name });
    expect(parsed).toStrictEqual({ ...minimumParsed, name });
  });

  test('version', () => {
    const version = '0.0.0';
    const parsed = parse({ ...minimumPkg, version });
    expect(parsed).toStrictEqual({ ...minimumParsed, version });
  });

  describe('description', () => {
    test('when is not defined', () => {
      const parsed = parse({ ...minimumPkg });
      expect(parsed).toStrictEqual({ ...minimumParsed });
    });

    test('from existing', () => {
      const description = 'Example app description';
      const parsed = parse({ ...minimumPkg, description });
      expect(parsed).toStrictEqual({ ...minimumParsed, description });
    });
  });

  describe('author', () => {
    test('when author is undefined', () => {
      const parsed = parse({ ...minimumPkg });
      expect(parsed).toStrictEqual({ ...minimumParsed });
    });

    describe('when author is a string', () => {
      test('with only name', () => {
        const name = 'Example';
        const parsed = parse({ ...minimumPkg, author: name });
        expect(parsed).toStrictEqual({ ...minimumParsed, author: { name } });
      });

      test('with only email', () => {
        const email = 'example@email.com';
        const parsed = parse({ ...minimumPkg, author: `<${email}>` });
        expect(parsed).toStrictEqual({ ...minimumParsed, author: { email } });
      });

      test('with only url', () => {
        const url = 'https://example.com';
        const parsed = parse({ ...minimumPkg, author: `(${url})` });
        expect(parsed).toStrictEqual({ ...minimumParsed, author: { url } });
      });

      test('with name and email', () => {
        const name = 'Example';
        const email = 'example@email.com';
        const parsed = parse({ ...minimumPkg, author: `${name} <${email}>` });
        expect(parsed).toStrictEqual({ ...minimumParsed, author: { name, email } });
      });

      test('with name and url', () => {
        const name = 'Example';
        const url = 'https://example.com';
        const parsed = parse({ ...minimumPkg, author: `${name} (${url})` });
        expect(parsed).toStrictEqual({ ...minimumParsed, author: { name, url } });
      });

      test('with name, email and url', () => {
        const name = 'Example';
        const email = 'example@email.com';
        const url = 'https://example.com';
        const parsed = parse({ ...minimumPkg, author: `${name} <${email}> (${url})` });
        expect(parsed).toStrictEqual({ ...minimumParsed, author: { name, email, url } });
      });
    });

    describe('when author is an object', () => {
      test('with only name', () => {
        const name = 'Example';
        const parsed = parse({ ...minimumPkg, author: { name } });
        expect(parsed).toStrictEqual({ ...minimumParsed, author: { name } });
      });

      test('with only email', () => {
        const email = 'example@email.com';
        const parsed = parse({ ...minimumPkg, author: { email } });
        expect(parsed).toStrictEqual({ ...minimumParsed, author: { email } });
      });

      test('with only url', () => {
        const url = 'https://example.com';
        const parsed = parse({ ...minimumPkg, author: { url } });
        expect(parsed).toStrictEqual({ ...minimumParsed, author: { url } });
      });

      test('with name and email', () => {
        const name = 'Example';
        const email = 'example@email.com';
        const parsed = parse({ ...minimumPkg, author: { name, email } });
        expect(parsed).toStrictEqual({ ...minimumParsed, author: { name, email } });
      });

      test('with name and url', () => {
        const name = 'Example';
        const url = 'https://example.com';
        const parsed = parse({ ...minimumPkg, author: { name, url } });
        expect(parsed).toStrictEqual({ ...minimumParsed, author: { name, url } });
      });

      test('with name, email and url', () => {
        const name = 'Example';
        const email = 'example@email.com';
        const url = 'https://example.com';
        const parsed = parse({ ...minimumPkg, author: { name, email, url } });
        expect(parsed).toStrictEqual({ ...minimumParsed, author: { name, email, url } });
      });
    });
  });

  describe('Github Confirm', () => {
    test('from undefined repository', () => {
      const { github } = parse({ ...minimumPkg });
      expect(github).toBe(false);
    });

    describe('from string repository', () => {
      test('is a github url', () => {
        const repository = 'https://github.com/example/example';
        const { github } = parse({ ...minimumPkg, repository });
        expect(github).toBe(true);
      });

      test('is not a github url', () => {
        const repository = 'https://gitlab.com/example/example';
        const { github } = parse({ ...minimumPkg, repository });
        expect(github).toBe(false);
      });
    });

    describe('from object repository', () => {
      test('is a github url', () => {
        const url = 'https://github.com/example/example';
        const { github } = parse({ ...minimumPkg, repository: { type: 'git', url } });
        expect(github).toBe(true);
      });

      test('is not a github url', () => {
        const url = 'https://gitlab.com/example/example';
        const { github } = parse({ ...minimumPkg, repository: { type: 'git', url } });
        expect(github).toBe(false);
      });
    });
  });

  describe('Github Url', () => {
    test('from undefined repository', () => {
      const { githubUrl } = parse({ ...minimumPkg });
      expect(githubUrl).toBeUndefined();
    });

    test('from string git repository', () => {
      const url = 'https://github.com/example/example';
      const repository = `${url}.git`;
      const { githubUrl } = parse({ ...minimumPkg, repository });
      expect(githubUrl).toBe(url);
    });

    test('from string non git repository', () => {
      const repository = 'https://gitlab.com/example/example';
      const { githubUrl } = parse({ ...minimumPkg, repository });
      expect(githubUrl).toBeUndefined();
    });

    test('from object git repository', () => {
      const url = 'https://github.com/example/example';
      const { githubUrl } = parse({ ...minimumPkg, repository: { type: 'git', url } });
      expect(githubUrl).toBe(url);
    });

    test('from object git repository', () => {
      const url = 'https://gitlab.com/example/example';
      const { githubUrl } = parse({ ...minimumPkg, repository: { type: 'git', url } });
      expect(githubUrl).toBeUndefined();
    });
  });

  describe('license', () => {
    test('when is not defined', () => {
      const parsed = parse({ ...minimumPkg });
      expect(parsed).toStrictEqual({ ...minimumParsed });
    });

    test('from existing', () => {
      const license = 'example-app';
      const parsed = parse({ ...minimumPkg, license });
      expect(parsed).toStrictEqual({ ...minimumParsed, license });
    });
  });
});
