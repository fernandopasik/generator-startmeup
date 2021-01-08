import ask from '../ask';
import isPresent from './is-present';

const confirm = async (
  moduleName: string,
  confirmDefault = false,
  confirmMessage?: string,
): Promise<boolean> => {
  const message = confirmMessage ?? `Do you want to use ${moduleName}?`;

  const response = (await ask([
    {
      type: 'confirm',
      name: moduleName,
      default: isPresent(moduleName) || confirmDefault,
      message,
    },
  ])) as Record<string, boolean>;

  return response[moduleName];
};
export default confirm;
