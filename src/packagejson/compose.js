const compose = ({
  appName,
  appDescription,
  authorName,
  authorEmail = '',
  authorUrl = '',
  githubConfirm,
  githubUrl,
  license,
}) => ({
  name: appName,
  description: appDescription,
  author: [
    authorName,
    authorEmail && ` <${authorEmail}>`,
    authorUrl && ` (${authorUrl})`,
  ].join(''),
  ...(!(githubConfirm && githubUrl) ? {} : {
    repository: {
      type: 'git',
      url: `${githubUrl}.git`,
    },
    homepage: githubUrl,
    bugs: `${githubUrl}/issues`,
  }),
  license,
});

module.exports = compose;
