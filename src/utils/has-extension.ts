const hasExtension = (filename: string, extension: string): boolean =>
  filename.endsWith(`.${extension}`);

export default hasExtension;
