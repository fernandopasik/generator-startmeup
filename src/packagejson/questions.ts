import githubUsername from 'github-username';
import { Answers } from 'inquirer';
import path from 'path';
import yeomanGenerator from 'yeoman-generator';
import { Question } from '../core';

interface Author {
  name: string;
  email: string;
}

const {
  prototype: { user },
} = yeomanGenerator;

const LICENSES = ['MIT', 'UNLICENSED'];
const [DEFAULT_LICENSE] = LICENSES;

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
        when: (props: Readonly<Answers>): boolean => Boolean((props.author as Author).name),
      },
      {
        name: 'url',
        type: 'input',
        message: 'What is your url?',
        default: '',
        when: (props: Readonly<Answers>): boolean => Boolean((props.author as Author).name),
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
      const username = await githubUsername((props.author as Author).email);
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
  {
    name: 'license',
    type: 'list',
    message: 'What kind of license do you want?',
    choices: LICENSES,
    default: DEFAULT_LICENSE,
  },
];

export default questions;
