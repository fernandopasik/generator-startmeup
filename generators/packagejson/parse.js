const parse = (pkg) => {
  const {
    name,
    description,
    author,
    repository,
    license,
  } = pkg;

  let {
    name: authorName,
    email: authorEmail,
    url: authorUrl,
  } = author || {};

  if (typeof author === 'string') {
    authorName = author.replace(/\s[(<].*/g, '');
    [, authorEmail] = author.match(/<([^>]+)>/) || [];
    [, authorUrl] = author.match(/\(([^)]+)\)/) || [];
  }

  const repoUrl = (repository && repository.url) || repository;

  const parseable = {
    appName: name,
    appDescription: description,
    authorName,
    authorEmail,
    authorUrl,
    githubConfirm: repoUrl && !!repoUrl.match(/github\.com/),
    githubUrl: repoUrl && repoUrl.replace(/.git$/, ''),
    license,
  };

  const parsed = Object.keys(parseable).reduce((all, parsedKey) => ({
    ...all,
    ...(typeof parseable[parsedKey] === 'undefined' ? {} : {
      [parsedKey]: parseable[parsedKey],
    }),
  }), {});

  return parsed;
};

module.exports = parse;
