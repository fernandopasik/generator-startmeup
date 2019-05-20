const path = require('path');

let api = {};

const setApi = (generator) => {
  api = generator;
};

const answers = {};

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
    default: () => api.user.git.name(),
  },
  authorEmail: {
    type: 'input',
    message: 'What is your email?',
    default: () => api.user.git.email(),
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
    default: async () => {
      const username = await api.user.github.username();
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

const ask = async (questionNames = []) => {
  const nonResponded = questionNames
    .filter(questionName => questions[questionName])
    .filter(questionName => !answers[questionName]);

  const questionsToAsk = nonResponded.map(questionName => ({
    ...questions[questionName],
    name: questionName,
  }));

  const responses = await api.prompt(questionsToAsk);

  nonResponded.forEach((questionName) => {
    answers[questionName] = responses[questionName];
  });
};

module.exports = {
  setApi,
  ask,
  answers,
};
