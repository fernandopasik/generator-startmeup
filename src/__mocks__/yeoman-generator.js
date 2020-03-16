/* eslint-disable jest/prefer-spy-on, @typescript-eslint/no-unsafe-member-access */
module.exports = jest.fn(function YeomanGenerator() {
  this.destinationPath = jest.fn();
  this.fs = {
    readJSON: jest.fn(),
  };
  this.user = {
    git: {
      name: jest.fn(),
      email: jest.fn(),
    },
    github: {
      username: jest.fn(),
    },
  };
  this.prompt = jest.fn();
});
