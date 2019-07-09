const compose = require('../compose');

describe('Compose package.json from parameters', () => {
  test('name', () => {
    const appName = 'example-app';
    const pkg = compose({ appName });
    expect(pkg).toHaveProperty('name', appName);
  });

  test('description', () => {
    const appDescription = 'this is an example';
    const pkg = compose({ appDescription });
    expect(pkg).toHaveProperty('description', appDescription);
  });

  describe('author', () => {
    test('with only name', () => {
      const authorName = 'Example';
      const pkg = compose({ authorName });
      expect(pkg).toHaveProperty('author', authorName);
    });

    test('with name and email', () => {
      const authorName = 'Example';
      const authorEmail = 'example@email.com';
      // const url = 'example.com';
      const pkg = compose({ authorName, authorEmail });
      expect(pkg).toHaveProperty('author', `${authorName} <${authorEmail}>`);
    });

    test('with name and url', () => {
      const authorName = 'Example';
      const authorUrl = 'example.com';
      const pkg = compose({ authorName, authorUrl });
      expect(pkg).toHaveProperty('author', `${authorName} (${authorUrl})`);
    });

    test('with name, email and url', () => {
      const authorName = 'Example';
      const authorEmail = 'example@email.com';
      const authorUrl = 'example.com';
      const pkg = compose({ authorName, authorEmail, authorUrl });
      expect(pkg).toHaveProperty('author', `${authorName} <${authorEmail}> (${authorUrl})`);
    });
  });

  test('repository', () => {
    const githubConfirm = true;
    const githubUrl = 'https://github.com/example/example';
    const pkg = compose({ githubConfirm, githubUrl });
    expect(pkg).toHaveProperty('repository', {
      type: 'git',
      url: `${githubUrl}.git`,
    });
  });

  test('homepage', () => {
    const githubConfirm = true;
    const githubUrl = 'https://github.com/example/example';
    const pkg = compose({ githubConfirm, githubUrl });
    expect(pkg).toHaveProperty('homepage', githubUrl);
  });

  test('bugs', () => {
    const githubConfirm = true;
    const githubUrl = 'https://github.com/example/example';
    const pkg = compose({ githubConfirm, githubUrl });
    expect(pkg).toHaveProperty('bugs', `${githubUrl}/issues`);
  });
});
