// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-type-alias
export type ConfigValue = any;

// eslint-disable-next-line @typescript-eslint/no-type-alias
export type Config = Record<string, ConfigValue>;

const store = new Map<string, Config>();

export default store;
