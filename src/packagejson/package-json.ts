// Type definition is based on specs from https://docs.npmjs.com/files/package.json

type Bugs = string | {
  url?: string;
  email?: string;
}

export type Person = string | {
  name?: string;
  email?: string;
  url?: string;
}

type Repository = string | {
  type: string;
  url: string;
  directory?: string;
}

interface DefaultScripts {
  // Install
  preinstall?: string;
  install?: string;
  postinstall?: string;
  // Test
  pretest?: string;
  test?: string;
  posttest?: string;

  // Start
  prestart?: string;
  start?: string;
  poststart?: string;
  // Stop
  prestop?: string;
  stop?: string;
  poststop?: string;
  // Restart
  prerestart?: string;
  restart?: string;
  postrestart?: string;

  // Version
  preversion?: string;
  version?: string;
  postversion?: string;
  // Publish
  prepublish?: string;
  prepare?: string;
  prepublishOnly?: string;
  prepack?: string;
  postpack?: string;
  publish?: string;
  postpublish?: string;

  // Shrinkwrap
  preshrinkwrap?: string;
  shrinkwrap?: string;
  postshrinkwrap?: string;
  // Uninstall
  preuninstall?: string;
  uninstall?: string;
  postuninstall?: string;
}

type Scripts = DefaultScripts & {
  [scriptName: string]: string;
}

interface Dependencies {
  [packageName: string]: string;
}

export interface PackageJson {
  name: string;
  version: string;
  private?: boolean;
  description?: string;
  keywords?: string[];
  homepage?: string;
  bugs?: Bugs;
  repository?: Repository;
  license?: string;
  author?: Person;
  contributors?: Person[];
  files?: string[];
  main?: string;
  module?: string;
  types?: string;
  typings?: string;
  scripts?: Scripts;
  dependencies?: Dependencies;
  devDependencies?: Dependencies;
  peerDependencies?: Dependencies;
  bundledDependencies?: Dependencies;
  bundleDependencies?: Dependencies;
  optionalDependencies?: Dependencies;
}
