import path from 'path';
import currentDir from './current-dir';

const currentPath = (filename = ''): string => path.join(currentDir(), filename);

export default currentPath;
