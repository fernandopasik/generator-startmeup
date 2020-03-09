import path from 'path';

const currentPath = (filename: string = ''): string => path.join(process.cwd(), filename);

export default currentPath;
