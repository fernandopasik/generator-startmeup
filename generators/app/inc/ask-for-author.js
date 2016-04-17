'use strict';

/**
 * Ask for Author info.
 */
module.exports = function () {

  const done = this.async();

  this.prompt([
    {
      name: 'authorName',
      message: 'What is your name?',
      default: this.user.git.name()
    },
    {
      name: 'authorEmail',
      message: 'What is your email?',
      default: this.user.git.email(),
      when: props => props.authorName
    },
    {
      name: 'authorUrl',
      message: 'What is your url?',
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
