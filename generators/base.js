const Generator = require('yeoman-generator');
const path = require('path');

module.exports = class Base extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.pkgJson = Object.assign({}, this.fs.readJSON(this.destinationPath('package.json')));
    this.devDeps = [];
  }

  willInstall(dependency) {
    const { devDependencies = {} } = this.pkgJson;
    return devDependencies[dependency] || this.devDeps.includes(dependency);
  }

  async promptFields(fieldNames) {
    const availableFields = {
      appName: {
        type: 'input',
        name: 'appName',
        message: 'What is your app\'s name?',
        default: path.basename(process.cwd()),
      },
      appDescription: {
        type: 'input',
        name: 'appDescription',
        message: 'What is your app\'s description?',
        default: '',
      },
      authorName: {
        type: 'input',
        name: 'authorName',
        message: 'What is your name?',
        default: this.user.git.name(),
      },
      authorEmail: {
        type: 'input',
        name: 'authorEmail',
        message: 'What is your email?',
        default: this.user.git.email(),
        when: props => props.authorName,
      },
      authorUrl: {
        type: 'input',
        name: 'authorUrl',
        message: 'What is your url?',
        default: '',
        when: props => props.authorName,
      },
      githubConfirm: {
        type: 'confirm',
        name: 'githubConfirm',
        default: true,
        message: 'Are you going to use github?',
      },
      githubUsername: {
        type: 'input',
        name: 'githubUsername',
        message: 'What is your github username?',
        default: await this.user.github.username(),
        when: props => props.githubConfirm,
      },
      githubRepo: {
        type: 'input',
        name: 'githubRepo',
        message: 'What is your github repo?',
        default: props => `https://github.com/${props.githubUsername}/${props.appName}`,
        when: props => props.githubConfirm,
      },
    };

    const selectedFields = fieldNames || Object.keys(availableFields);

    this.answers = await this.prompt(selectedFields.map(fieldName => availableFields[fieldName]));
  }
};
