/*global module:false*/
module.exports = function(grunt) {
  var path = require('path');

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    less: {
      options: {
        // compress: true
      },
      all: {
        expand: true,
        cwd: "./",
        src: ["*/*.less", "!_base/**/*"],
        dest: "./",
        ext: ".css",
      }
    },
    shell: {
      // gen example pages
      genPage: {
        command: function() {
          return getThemes().map(function(v) {
            return 'zenpage  --theme=' + v + ' example.md _build/' + v + '/example.html';
          }).join(' && ');
        }
      },
      genScreenshot: {
        command: function() {
          return getThemes().map(function(v) {
            return 'phantomjs rasterize.js _build/' + v + '/example.html ' + v + '/snapshot.png 768px 0.8';
          }).join(' && ');
        }
      },
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    }
  });

  function getThemes() {
    return grunt.file.expand("*/theme.json").map(function(v) {
      return path.basename(path.dirname(v));
    });
  }

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-shell');


  // Default task.
  grunt.registerTask('default', ['less', 'shell']);

};
