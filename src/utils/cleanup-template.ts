const cleanupTemplate = (content = ''): string =>
  content
    .replaceAll('///', '')
    .replaceAll(/[^\S\r\n]*\/\/[^\S\r\n\w]*\n/g, '')
    .replaceAll(/[^\S\r\n]*#[^\S\r\n\w]*\n/g, '');

export default cleanupTemplate;
