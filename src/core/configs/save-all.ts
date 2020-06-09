import save from './save';
import store, { Config } from './store';

const saveAll = async (): Promise<void> => {
  await Promise.all(
    Array.from(
      store.entries(),
    ).map(async ([filename, config]: readonly [string, Readonly<Config>]) =>
      save(filename, config),
    ),
  );
};

export default saveAll;
