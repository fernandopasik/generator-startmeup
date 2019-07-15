import path from 'path';
import githubUsername from 'github-username';
import yeomanGenerator from 'yeoman-generator';
import { Question, Answer, Answers } from 'inquirer';

const { prototype: { user } } = yeomanGenerator;

const questions: Question<Answer>[] = [
  {
    name: 'name',
    type: 'input',
    message: 'What is your app\'s name?',
    default: (): string => path.basename(process.cwd()),
  }, {
    name: 'description',
    type: 'input',
    message: 'What is your app\'s description?',
    default: '',
  }, {
    name: 'authorName',
    type: 'input',
    message: 'What is your name?',
    default: (): string => user.git.name(),
  }, {
    name: 'authorEmail',
    type: 'input',
    message: 'What is your email?',
    default: (): string => user.git.email(),
    when: (props: Answers): boolean => !!props.authorName,
  }, {
    name: 'authorUrl',
    type: 'input',
    message: 'What is your url?',
    default: '',
    when: (props: Answers): boolean => !!props.authorName,
  }, {
    name: 'github',
    type: 'confirm',
    default: true,
    message: 'Are you going to use github?',
  }, {
    name: 'githubUsername',
    type: 'input',
    message: 'What is your github username?',
    default: async (props: Answers): Promise<string> => {
      const username = await githubUsername(props.authorEmail);
      return username;
    },
    when: (props: Answers): boolean => !!props.github,
  }, {
    name: 'githubUrl',
    type: 'input',
    message: 'What is your github url?',
    default: (props: Answers): string => `https://github.com/${props.githubUsername}/${props.name}`,
    when: (props: Answers): boolean => !!props.github,
  },
];

export default questions;
