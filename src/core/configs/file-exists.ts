import fs from 'fs';
import currentPath from './current-path';

const fileExists = (filename: string): boolean => fs.existsSync(currentPath(filename));

export default fileExists;
