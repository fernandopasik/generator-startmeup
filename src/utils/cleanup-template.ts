const cleanupTemplate = (content = ''): string =>
  content
    .replaceAll('///', '')
    .replaceAll(/[^\S\r\n]*\/\/[^\S\r\n\w]*\n/gu, '')
    .replaceAll(/[^\S\r\n]*#[^\S\r\n\w]*\n/gu, '');

export default cleanupTemplate;
