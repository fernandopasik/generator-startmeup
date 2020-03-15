// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-type-alias
export type Config = Record<string, any>;

const store = new Map<string, Config>();

export default store;
