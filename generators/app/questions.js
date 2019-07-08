const path = require('path');
const githubUsername = require('github-username');
const { prototype: { user } } = require('yeoman-generator');

const questions = {
  appName: {
    type: 'input',
    message: 'What is your app\'s name?',
    default: () => path.basename(process.cwd()),
  },
  appDescription: {
    type: 'input',
    message: 'What is your app\'s description?',
    default: '',
  },
  authorName: {
    type: 'input',
    message: 'What is your name?',
    default: () => user.git.name(),
  },
  authorEmail: {
    type: 'input',
    message: 'What is your email?',
    default: () => user.git.email(),
    when: props => props.authorName,
  },
  authorUrl: {
    type: 'input',
    message: 'What is your url?',
    default: '',
    when: props => props.authorName,
  },
  githubConfirm: {
    type: 'confirm',
    default: true,
    message: 'Are you going to use github?',
  },
  githubUsername: {
    type: 'input',
    message: 'What is your github username?',
    default: async (props) => {
      const username = await githubUsername(props.authorEmail);
      return username;
    },
    when: props => props.githubConfirm,
  },
  githubRepo: {
    type: 'input',
    message: 'What is your github repo?',
    default: props => `https://github.com/${props.githubUsername}/${props.appName}`,
    when: props => props.githubConfirm,
  },
};

module.exports = questions;
