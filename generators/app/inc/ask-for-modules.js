'use strict';

/**
 * Ask for project data from the User.
 */
module.exports = function () {

  const
    done = this.async(),
    prompts = {
      type: 'checkbox',
      name: 'modules',
      message: 'Which modules would you like to include?',
      default: [ 'eslint' ],
      choices: [
        {
          value: 'jshint',
          name: 'jshint',
          checked: false
        },
        {
          value: 'jscs',
          name: 'jscs',
          checked: false
        },
        {
          value: 'eslint',
          name: 'eslint',
          checked: true
        }
      ]
    };

  this.prompt(prompts, props => {
    this.modules = props.modules;

    if (-1 !== this.modules.indexOf('eslint')) {
      this.modules.push('eslint-config-fernandopasik');
    }

    done();
  });

};
