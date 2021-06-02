// eslint-disable-next-line import/prefer-default-export
export const removeTemplateComments = (content = ''): string =>
  content.replace(/\/\/\//g, '').replace(/[^\S\r\n]*\/\/[^\S\r\n\w]*\n/g, '');
