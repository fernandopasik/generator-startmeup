type Plugin = string | [string, Record<string, string | number | boolean>];

interface BabelConfig {
  presets?: string[];
  plugins?: Plugin[];
}

const presets: Set<string> = new Set();

export const addPreset = (preset: string): Set<string> => presets.add(preset);
export const getPresets = (): string[] => Array.from(presets);

export const getBabelConfig = (): BabelConfig => ({
  presets: Array.from(presets),
  plugins: [
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
  ],
});
