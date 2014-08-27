'use strict';

module.exports = function (grunt) {

  var app = {
    files: {
      js: [
        'Gruntfile.js',
        'generators/{,**/}*.js',
        'test/{,**/}*.js'
      ]
    }
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      js: {
        files: app.files.js,
        tasks: ['jshint', 'jscs', 'mochacov']
      }
    },

    // JavaScript Lint
    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      all: app.files.js
    },

    // JavaScript Code Style check
    jscs: {
      all: app.files.js
    },

    shell: {
      options: {
        stdout: true,
        stderr: false
      },
      test: {
        command: 'npm test'
      }
    },

    mochacov: {
      test: {
        options: {
          reporter: 'spec'
        }
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          output: 'test/coverage.html'
        }
      },
      coveralls: {
        options: {
          coveralls: {
            serviceName: 'travis-ci'
          }
        }
      },
      options: {
        files: 'test/index.js'
      }
    },

    clean: {
      temp: ['.tmp'],
      coverage: ['test/coverage.html']
    }
  });

  // Load all grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', ['clean', 'jshint', 'jscs', 'mochacov:test', 'mochacov:coverage']);
  grunt.registerTask('travis', ['jshint', 'jscs', 'mochacov:test', 'mochacov:coveralls']);
  grunt.registerTask('default', ['test']);
};
