const cleanupTemplate = (content = ''): string =>
  content.replace(/\/\/\//g, '').replace(/[^\S\r\n]*\/\/[^\S\r\n\w]*\n/g, '');

export default cleanupTemplate;
