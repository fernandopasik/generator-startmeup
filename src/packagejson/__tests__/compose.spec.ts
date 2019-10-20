import compose from '../compose';

const minimumParsed = {
  name: 'example-app',
  version: 'none',
  github: false,
};

describe('Compose package.json from', () => {
  it('name', () => {
    const name = 'example-app';
    const pkg = compose({ ...minimumParsed, name });
    expect(pkg).toHaveProperty('name', name);
  });

  it('description', () => {
    const description = 'this is an example';
    const pkg = compose({ ...minimumParsed, description });
    expect(pkg).toHaveProperty('description', description);
  });

  describe('author', () => {
    it('with only name', () => {
      const name = 'Example';
      const pkg = compose({ ...minimumParsed, author: { name } });
      expect(pkg).toHaveProperty('author', name);
    });

    it('with only email', () => {
      const email = 'example@email.com';
      const pkg = compose({ ...minimumParsed, author: { email } });
      expect(pkg).toHaveProperty('author', `<${email}>`);
    });

    it('with only url', () => {
      const url = 'https://example.com';
      const pkg = compose({ ...minimumParsed, author: { url } });
      expect(pkg).toHaveProperty('author', `(${url})`);
    });

    it('with name and email', () => {
      const name = 'Example';
      const email = 'example@email.com';
      const pkg = compose({ ...minimumParsed, author: { name, email } });
      expect(pkg).toHaveProperty('author', `${name} <${email}>`);
    });

    it('with name and url', () => {
      const name = 'Example';
      const url = 'https://example.com';
      const pkg = compose({ ...minimumParsed, author: { name, url } });
      expect(pkg).toHaveProperty('author', `${name} (${url})`);
    });

    it('with name, email and url', () => {
      const name = 'Example';
      const email = 'example@email.com';
      const url = 'https://example.com';
      const pkg = compose({ ...minimumParsed, author: { name, email, url } });
      expect(pkg).toHaveProperty('author', `${name} <${email}> (${url})`);
    });
  });

  it('repository', () => {
    const githubUrl = 'https://github.com/example/example';
    const pkg = compose({ ...minimumParsed, githubUrl });
    expect(pkg).toHaveProperty('repository', {
      type: 'git',
      url: `${githubUrl}.git`,
    });
  });

  it('homepage', () => {
    const githubUrl = 'https://github.com/example/example';
    const pkg = compose({ ...minimumParsed, githubUrl });
    expect(pkg).toHaveProperty('homepage', githubUrl);
  });

  it('bugs', () => {
    const githubUrl = 'https://github.com/example/example';
    const pkg = compose({ ...minimumParsed, githubUrl });
    expect(pkg).toHaveProperty('bugs', `${githubUrl}/issues`);
  });
});
