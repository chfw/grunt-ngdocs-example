module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-ngdocs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-plantuml');

  grunt.initConfig({
    plantuml: {
          all: {
              src: ['ngdocs/*.uml'],
              dest: 'docs/images'
          }
    },
    copy: {
      images: {
        files: [
          {
            nonull: true,
            expand: true,
            cwd: 'ngdocs/images/',
            dest: 'docs/images/',
            src: ['*.*']
          }
        ]
      }
    },
    ngdocs: {
      options: {
        scripts: ['angular.js', '../src.js'],
        title: 'Sample Documentation',
        html5Mode: false,
        template: 'index.tmpl',
        startPage: 'guide'  
      },
      guide: {
          src: ['ngdocs/*.ngdoc',
               ],
        title: 'Tutorial'
      },
      api: {
        src: [
          'src/*.js'
        ],
        title: 'API documentation'
      }
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
        plantuml: {
            files: ['ngdocs/*.uml'],
            tasks: ['plantuml'],
            options: {
                livereload: true
            }
        },
        ngdocs: {
            files: ['ngdocs/*.ngdoc'],
            tasks: ['ngdocs'],
            options: {
                livereload: true
            }
        },
        images: {
            files: ['ngdocs/images/*'],
            tasks: ['copy'],
            options: {
                livereload: true
            }
        }
    },  
    connect: {
        server: {
            options: {
                base: 'docs',
                livereload: true,
                open: true
            }
        }
    },
    clean: ['docs']
  });

    grunt.registerTask('default', ['clean', 'copy', 'plantuml:all', 'ngdocs']);

    grunt.registerTask('serve', ['clean', 'copy', 'plantuml:all', 'ngdocs',  'connect:server', 'watch']);

};
