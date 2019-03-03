const path = require('path');

module.exports = async function appMeta() {
  return this.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your app\'s name ?',
      default: path.basename(process.cwd()),
    },
    {
      type: 'input',
      name: 'description',
      message: 'What is your app\'s description ?',
      default: '',
    },
  ]);
};
