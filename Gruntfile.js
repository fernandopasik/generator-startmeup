/*jshint camelcase: false */

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

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: 'test/index.js'
      }
    },

    mocha_istanbul: {
      coverage: {
        src: 'test/index.js',
        options: {
          quiet: true
        }
      },
      coveralls: {
        src: 'test/index.js',
        options: {
          quiet: true,
          coverage:true,
          check: {
            lines: 75,
            statements: 75
          },
          root: 'app',
          reportFormats: ['cobertura','lcovonly']
        }
      }
    },

    clean: {
      temp: ['.tmp'],
      coverage: ['test/coverage.html']
    }
  });

  grunt.event.on('coverage', function (lcov, done) {
    require('coveralls').handleInput(lcov, function (err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

  // Load all grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('mocha', ['mochaTest:test']);
  grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
  grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);

  grunt.registerTask('test', ['clean', 'jshint', 'jscs', 'coverage', 'mocha']);
  grunt.registerTask('travis', ['jshint', 'jscs', 'coverage', 'coveralls', 'mocha']);
  grunt.registerTask('default', ['test']);
};
