const hasExtension = (filename: string, extension: string): boolean =>
  new RegExp(`.${extension}$`).test(filename);

export default hasExtension;
