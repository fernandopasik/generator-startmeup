import ask from '../ask';
import isPresent from './is-present';

const confirm = async (moduleName: string, message: string): Promise<boolean> => {
  const response = (await ask([
    {
      type: 'confirm',
      name: moduleName,
      default: isPresent(moduleName),
      message,
    },
  ])) as Record<string, boolean>;

  return response[moduleName];
};
export default confirm;
