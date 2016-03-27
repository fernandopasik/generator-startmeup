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
      default: [ 'jshint', 'jscs' ],
      choices: [
        {
          value: 'jshint',
          name: 'jshint',
          checked: true
        },
        {
          value: 'jscs',
          name: 'jscs',
          checked: true
        }
      ]
    };

  this.prompt(prompts, props => {
    this.modules = props.modules;
    done();
  });

};
