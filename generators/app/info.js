const questions = require('./questions');

let api = {};

const setApi = (generator) => {
  api = generator;
};

const answers = {};

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
