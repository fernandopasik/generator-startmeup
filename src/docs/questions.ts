import path from 'path';
import githubUsername from 'github-username';
import yeomanGenerator from 'yeoman-generator';
import { Answers } from 'inquirer';

import { Question } from '../core';

const {
  prototype: { user },
} = yeomanGenerator;

const questions: Question[] = [
  {
    name: 'name',
    type: 'input',
    message: "What is your app's name?",
    default: (): string => path.basename(process.cwd()),
  },
  {
    name: 'description',
    type: 'input',
    message: "What is your app's description?",
    default: '',
  },
  {
    name: 'author',
    questions: [
      {
        name: 'name',
        type: 'input',
        message: 'What is your name?',
        default: (): string => user.git.name(),
      },
      {
        name: 'email',
        type: 'input',
        message: 'What is your email?',
        default: (): string => user.git.email(),
        when: (props: Readonly<Answers>): boolean => Boolean(props.author.name),
      },
      {
        name: 'url',
        type: 'input',
        message: 'What is your url?',
        default: '',
        when: (props: Readonly<Answers>): boolean => Boolean(props.author.name),
      },
    ],
  },
  {
    name: 'github',
    type: 'confirm',
    default: true,
    message: 'Are you going to use github?',
  },
  {
    name: 'githubUsername',
    type: 'input',
    message: 'What is your github username?',
    default: async (props: Readonly<Answers>): Promise<string> => {
      const username = await githubUsername(props.author.email);
      return username;
    },
    when: (props: Readonly<Answers>): boolean => Boolean(props.github),
  },
  {
    name: 'githubUrl',
    type: 'input',
    message: 'What is your github url?',
    default: (props: Readonly<Answers>): string =>
      Boolean(props.githubUsername) && Boolean(props.name)
        ? `https://github.com/${props.githubUsername as string}/${props.name as string}`
        : '',
    when: (props: Readonly<Answers>): boolean => Boolean(props.github),
  },
];

export default questions;
