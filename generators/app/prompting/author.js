'use strict';

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
    url: committer.match(/\((.*)\)/) && committer.match(/\((.*)\)/)[1]
  };
}

/**
 * Ask for Author info.
 */
module.exports = function () {

  const
    done = this.async(),
    existingAuthor = parseCommitter(this.pkg.author);

  this.prompt([
    {
      name: 'authorName',
      message: 'What is your name?',
      default: existingAuthor.name || this.user.git.name()
    },
    {
      name: 'authorEmail',
      message: 'What is your email?',
      default: existingAuthor.email || this.user.git.email(),
      when: props => props.authorName
    },
    {
      name: 'authorUrl',
      message: 'What is your url?',
      default: existingAuthor.url || '',
      when: props => props.authorName
    }
  ], props => {

    if (props.authorName) {
      this.authorName = props.authorName;
      this.pkg.author = props.authorName;

      if (props.authorEmail) {
        this.pkg.author += ` <${props.authorEmail}>`;
      }

      if (props.authorUrl) {
        this.pkg.author += ` (${props.authorUrl})`;
      }
    }

    done();
  });
};
