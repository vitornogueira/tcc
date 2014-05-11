module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        mangle: false,
        sourceMap: 'public/assets/js/source.map.js',
        sourceMappingURL: 'source.map.js'
      },
      dist: {
        src: [
          'public/_assets/components/angular/angular.min.js',
          'public/_assets/components/angular-sanitize/angular-sanitize.min.js',
          'public/_assets/components/angular-animate/angular-animate.min.js',
          'public/_assets/components/angular-ui-router/release/angular-ui-router.min.js',
          'public/_assets/components/angular-ui-utils/ui-utils.min.js',
          'public/_assets/components/angular-bootstrap/ui-bootstrap.min.js',
          'public/_assets/components/angular-bootstrap/ui-bootstrap-tpls.min.js',
          'public/_assets/components/angular-flash-messages/angular-flash-messages.js',
          'public/_assets/js/app.js',
          'public/_assets/js/routingConfig.js',
          'public/_assets/js/filters.js',
          'public/_assets/js/services/*.js',
          'public/_assets/js/directives/*.js',
          'public/_assets/js/controllers/*.js'
        ],
        dest: 'public/assets/js/application.js'
      }
    }, // uglify

    stylus: {
      compile: {
        files: {
          'public/assets/css/main.css': ['public/_assets/stylus/main.styl']
        }
      }
    }, // stylus

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7
        },
        files: [{
          expand: true,
          cwd: 'public/_assets/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'public/assets/img/'
        }]
      }
    }, // imagemin

    notify: {
      js: {
        options: {
          title: '<%= pkg.title %> JS',
          message: 'JS is ok!'
        }
      },
      css: {
        options: {
          title: '<%= pkg.title %> CSS',
          message: 'CSS is ok!'
        }
      },
      img: {
        options: {
          title: '<%= pkg.title %> IMG',
          message: 'IMG is ok!'
        }
      },
      watch: {
        options: {
          title: '<%= pkg.title %> Watch',
          message: 'Grunt is watching files (:'
        }
      }
    },

    watch: {
      js: {
        files: ['public/_assets/js/**/*.js'],
        tasks: ['uglify', 'notify:js']
      },
      css: {
        files: ['public/_assets/stylus/**/*.styl'],
        tasks: ['stylus', 'notify:css']
      },
      img: {
        files: ['public/_assets/img/**/*'],
        tasks: ['imagemin', 'notify:img']
      }
    }

  });

  require('load-grunt-tasks')(grunt);

  //Tasks
  grunt.registerTask('build', ['uglify', 'stylus', 'imagemin']);

  //Watch task
  grunt.registerTask('w', ['notify:watch', 'watch']);

  //Imagemin task
  grunt.registerTask('img', ['imagemin']);
};
