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
        tasks: ['jshint', 'jscs', 'mochaTest']
      }
    },

    // JavaScript Lint
    jshint: {
      options: {
        jshintrc: '.jshintrc',
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

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/index.js']
      }
    }
  });

  // Load all grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'jscs', 'mochaTest']);
};
