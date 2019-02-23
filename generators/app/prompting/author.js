/**
 * Parses the committer string from package.json
 * @param  {String} committer - All the commiter data (name, email, url)
 * @returns {Object} Parsed committer data
 */
function parseCommitter(committer) {
  if (!committer) {
    return {};
  }

  return {
    name: committer.match(/[^<(]*/) && committer.match(/[^<(]*/)[0].trim(),
    email: committer.match(/<(.*)>/) && committer.match(/<(.*)>/)[1],
    url: committer.match(/\((.*)\)/) && committer.match(/\((.*)\)/)[1],
  };
}

/**
 * Ask for Author info.
 * @returns {Promise} After prompting
 */
module.exports = function author() {
  const existingAuthor = parseCommitter(this.pkg.author);

  return this.prompt([
    {
      name: 'authorName',
      message: 'What is your name?',
      default: existingAuthor.name || this.user.git.name(),
    },
    {
      name: 'authorEmail',
      message: 'What is your email?',
      default: existingAuthor.email || this.user.git.email(),
      when: props => props.authorName,
    },
    {
      name: 'authorUrl',
      message: 'What is your url?',
      default: existingAuthor.url,
      when: props => props.authorName,
    },
  ]).then((props) => {
    let authorEntry = '';

    if (props.authorName) {
      authorEntry = props.authorName;

      // Save this for github username suggestion
      this.authorName = props.authorName;

      if (props.authorEmail) {
        authorEntry += ` <${props.authorEmail}>`;
      }

      if (props.authorUrl) {
        authorEntry += ` (${props.authorUrl})`;
      }
    }

    Object.assign(this.pkg, { author: authorEntry });
  });
};
