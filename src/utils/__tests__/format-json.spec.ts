import { type JsonObject } from 'type-fest';
import formatJson from '../format-json.js';
import prettierFormat from '../prettier-format.js';
import sortProps from '../sort-props.js';

jest.mock('../prettier-format.js', () => jest.fn((content: string) => content));
jest.mock('../sort-props.js', () => jest.fn((json: JsonObject): JsonObject => json));

describe('formatJson', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sorts properties', () => {
    it('once', async () => {
      await formatJson('{}', '', '');
      expect(sortProps).toHaveBeenCalledTimes(1);
    });

    it('with content', async () => {
      const json = '{"foo": "bar"}';
      await formatJson(json, '', '');
      expect(sortProps).toHaveBeenLastCalledWith(JSON.parse(json), expect.anything());
    });

    it('with options', async () => {
      await formatJson('{}', '', '');
      expect(sortProps).toHaveBeenLastCalledWith({}, ['extends', 'files', 'error']);
    });
  });

  describe('runs prettier format', () => {
    it('with filepath', async () => {
      const filepath = 'example.json';
      await formatJson('{}', filepath, '');
      expect(prettierFormat).toHaveBeenCalledWith(expect.anything(), filepath, expect.anything());
    });

    it('with root path', async () => {
      const root = '/';
      await formatJson('{}', '', root);
      expect(prettierFormat).toHaveBeenCalledWith(expect.anything(), expect.anything(), root);
    });

    it('with content', async () => {
      const content = '{"foo":"bar","foo2":"bar2","foo3":"bar3"}';
      const parsedContent = `{"foo":"bar","foo2":"bar2","foo3":"bar3"}`;
      await formatJson(content, '', '');
      expect(prettierFormat).toHaveBeenCalledWith(
        parsedContent,
        expect.anything(),
        expect.anything(),
      );
    });

    it('with short content', async () => {
      const content = '{"foo": "bar","foo2":"bar2"}';
      const parsedContent = `{
  "foo": "bar",
  "foo2": "bar2"
}`;
      await formatJson(content, '', '');
      expect(prettierFormat).toHaveBeenCalledWith(
        parsedContent,
        expect.anything(),
        expect.anything(),
      );
    });
  });
});
