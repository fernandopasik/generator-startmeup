const path = require('path');
const githubUsername = require('github-username');
const {
  prototype: { user },
} = require('yeoman-generator');

const questions = {
  name: {
    type: 'input',
    message: "What is your app's name?",
    default: () => path.basename(process.cwd()),
  },
  description: {
    type: 'input',
    message: "What is your app's description?",
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
  github: {
    type: 'confirm',
    default: true,
    message: 'Are you going to use github?',
  },
  githubUsername: {
    type: 'input',
    message: 'What is your github username?',
    default: async props => {
      const username = await githubUsername(props.authorEmail);
      return username;
    },
    when: props => props.github,
  },
  githubUrl: {
    type: 'input',
    message: 'What is your github url?',
    default: props => `https://github.com/${props.githubUsername}/${props.name}`,
    when: props => props.github,
  },
  license: {
    type: 'list',
    message: 'What license do you want?',
    default: 0,
    choices: ['MIT', 'UNLICENSED', 'BSD-3-Clause'],
  },
};

module.exports = questions;
