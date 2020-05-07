const LIBRARIES = ['lit-html', 'react'];

export default {
  confirm: LIBRARIES,
  confirmMessage: 'Which UI library do you want to use?',
  mainDependencies: [
    {
      name: 'prettier',
      type: 'dev',
    },
  ],
  name: 'libraries',
  replaceConfig: true,
};
