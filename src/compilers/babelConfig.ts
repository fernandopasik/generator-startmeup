const presets: Set<string> = new Set();

export const addPreset = (preset: string): Set<string> => presets.add(preset);
export const getPresets = (): string[] => Array.from(presets);

export const formatFile = (): string => {
  const presetList = Array.from(presets)
    .map((preset: string): string => `    '${preset}',`)
    .join('\n');

  return `module.exports = {
  presets: [
${presetList}
  ],
};
`;
};
