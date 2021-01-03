import { dependencies } from '../core';

const buildTaks = (): Record<string, string> => {
  const extensions = ['js'];
  const hasTS = dependencies.has('typescript', 'dev');
  const hasReact = dependencies.has('react') || dependencies.has('react', 'peer');

  if (hasTS) {
    extensions.push('ts');
  }

  if (hasReact) {
    extensions.push('jsx');
  }

  if (hasReact && hasTS) {
    extensions.push('tsx');
  }

  const extensionOption = extensions.sort((a, b) => a.localeCompare(b)).join(',');

  return {
    lint: `eslint . --ext ${extensionOption}`,
  };
};

export default buildTaks;
