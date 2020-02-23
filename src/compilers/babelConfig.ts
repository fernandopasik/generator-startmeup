const presets: Set<string> = new Set();

export const addPreset = (preset: string): Set<string> => presets.add(preset);
export const getPresets = (): string[] => Array.from(presets);

export const getConfig = (): any => ({
  presets: Array.from(presets),
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
  ],
});
