"use strict";

module.exports = function(grunt) {

    require("load-grunt-tasks")(grunt);

    grunt.initConfig({

      mkdir: {
      all: {
      options: {
        create: ['build']
      },
      },
      },

      copy: {
      build: {
      files: [{
      expand: true,
      src: [
        "fonts/**/*.{*}",
        "img/**/*.*",
        "js/**/*.*"
      ],
      dest: "build"
      }]
      }
      },

      clean: {
      build: ["build"]
      },

      less: {
      style: {
      files: {
      "build/css/style.css": ["less/style.less"]
      }
      }
      },     
      postcss: {
      style: {
      options: {
      processors: [
        require("autoprefixer")()
      ]
      },
      src: "build/css/*.css"
      }
      },

      csso: {
      style: {
      options: {
      report: "gzip"
      },
      files: {
      "build/css/style.min.css": ["build/css/style.css"]
      }
      }
      },
      
      svg_cleaner: {
    minifySvgs: {
      files: {
        'build/img': ['img/*.svg']
      }
      }
    },
            
    svgstore: {
      options: {
      includeTitleElement: false
      },
      sprite: {
      files: {
      "build/img/sprite.svg": ["img/icon-*.svg"]
      }
      }
      },

      posthtml: {
      options: {
      use: [
      require("posthtml-include")()
      ]
      },
      html: {
      files: [{
      expand: true,
      src: ["*.html"],
      dest: "build"
      }]
      }
      },

      imagemin: {
      images: {
      options: {
        optimizationLevel: 3,
        progressive: true
      },
      files: [{
        expand: true,
        src: ["img/**/*.{png,jpg,svg}"]
      }]
      }
      },

      cwebp: {
      images: {
      options: {
        q: 90
      },
      files: [{
        expand: true,
        src: ["img/**/*.{png,jpg}"],
        dest: "build"
      }]
      }
      },

      browserSync: {
      server: {
      bsFiles: {
        src: ["build/*.html", "build/css/*.css"]
      },
      options: {
        server: "build",
        watchTask: true
      }
      }
      },

      watch: {
      html: {
      files: ["*.html"],
      tasks: ["posthtml"]
      },
      style: {
      files: ["less/**/*.less"],
      tasks: ["less", "postcss", "csso"]
      }
      },



  });

  grunt.registerTask("serve", ["browserSync", "watch"]);
  grunt.registerTask("build", ["clean", "copy", "svg_cleaner", "picture", "less", "postcss", "csso", "posthtml"]);
  grunt.registerTask("picture", [/*"cwebp", "imagemin",*/ "svgstore"]);

};
