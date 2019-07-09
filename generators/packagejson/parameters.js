module.exports = {
  appName: {
    from: pkg => pkg.name,
    to: value => ({ name: value }),
  },
  appDescription: {
    from: pkg => pkg.description,
    to: value => ({ description: value }),
  },
};
//   'appName',
//   'appDescription',
//   'authorName',
//   'authorEmail',
//   'authorUrl',
//   'githubConfirm',
//   'githubUsername',
//   'githubRepo',
// ];
