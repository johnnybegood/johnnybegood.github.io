module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      default: {
        options: {
          cleancss: true
        },
        files: {
          "dist/css/<%= pkg.name %>.min.css": ["src/css/stylesheet.full.less"]
        }
      }
    },

    svgmin: {                                            // Task
        options: {                                        // Configuration that will be passed directly to SVGO
            plugins: [{
                removeViewBox: false
            }]
        },
        dist: {                                            // Target
            files: [{                // Dictionary of files
                expand: true,        // Enable dynamic expansion.
                cwd: 'src/img/',        // Src matches are relative to this path.
                src: ['*.svg'],    // Actual pattern(s) to match.
                dest: 'dist/img/',        // Destination path prefix.
                ext: '.min.svg'        // Dest filepaths will have this extension.
            }]
        }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', '!src/js/ext/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },

    responsive_images: {
      bgTask: {
        options: {
          sizes: [
            { width: 770, quality: 60 },
            { width: 1025 },
            { width: 1300 },
            { width: 2000, quality: 50 }]
        },
        files: [{
          expand: true,
           cwd: 'src/img/',        
           src: ['bg_*.{jpg,gif,png}'],
           dest: 'dist/img/'
        }]
      }
    },

    connect: {
      server: {
        options: {
          port: 9999,
          open: true,
        }
      },
    },

    watch: {
      src: {
        files: ['src/**/*.*', "*.html", "Gruntfile.js"],
        tasks: ['default'],
        options: { livereload: true}
      },  
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-responsive-images');

  // Default task(s).
  grunt.registerTask('default', ['svgmin', 'less', 'jshint', 'concat', 'uglify', 'responsive_images']);

  // Host task(s)
  grunt.registerTask("host", ["default", "connect", "watch"]);

};