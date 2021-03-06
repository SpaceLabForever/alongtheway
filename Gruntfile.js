module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      views: {
        files: ['app/views/**'],
        options: {
          livereload: true
        }
      },
      scripts: {
        files: ['app/scripts/**'],
        tasks: ['uglify'],
        options: {
          livereload: true
        }
      },
      styles: {
        files: ['app/styles/**'],
        tasks: ['sass', 'cssmin'],
        options: {
          livereload: true
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/styles',
          src: ['*.scss'],
          dest: 'public/css',
          ext: '.css'
        }]
      }
    },
    uglify: {
      my_target: {
        files: [{
          mangle: false,
          expand: true,
          cwd: 'app/scripts',
          src: '**/*.js',
          dest: 'public/js'
        }]
      }
    },
    cssmin: {
      minify: {
        expand: true,
        cwd: 'public/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'public/dist',
        ext: '.min.css'
      }
    },
    jshint: {
      // define the files to lint
      files: ['app/'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
          // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('default', ['watch', 'sass']);
  grunt.registerTask('build', ['sass', 'concat', 'uglify']);
  grunt.registerTask('jshint', ['jshint']);
};
