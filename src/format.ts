export const hasExtension = (filename: string, extension: string): boolean =>
  new RegExp(`.${extension}$`).test(filename);

export const removeTemplateComments = (content = ''): string =>
  content.replace(/\/\/\//g, '').replace(/[^\S\r\n]*\/\/[^\S\r\n\w]*\n/g, '');
