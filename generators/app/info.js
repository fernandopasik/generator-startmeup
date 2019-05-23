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

const filterKnownQuestions = questionNames => (
  questionNames.filter(questionName => questions[questionName])
);

const filterRespondedQuestions = questionNames => (
  questionNames.filter(questionName => typeof answers[questionName] === 'undefined')
);

const filterAnswers = (answersToFilter, questionNames) => (
  Object.entries(answersToFilter)
    .filter(([questionName]) => questionNames.includes(questionName))
    .reduce((knownAnswers, [questionName, answer]) => (
      Object.assign(knownAnswers, { [questionName]: answer })
    ), {})
);

const ask = async (questionNames = []) => {
  const knownQuestions = filterKnownQuestions(questionNames);
  const questionsToAsk = filterRespondedQuestions(knownQuestions);

  const toAsk = questionsToAsk.map(questionName => ({
    ...questions[questionName],
    name: questionName,
  }));

  const responses = await api.prompt(toAsk);

  Object.assign(answers, responses);

  return filterAnswers(answers, knownQuestions);
};

module.exports = {
  answers,
  ask,
  filterAnswers,
  filterKnownQuestions,
  filterRespondedQuestions,
  setApi,
};
