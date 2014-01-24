module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    prepare: {
      include: ['libs/signals/dist/signals.min.js']
    },
    concat: {
      options: {
        separator: "\n\n"
      },
      dist: {
        src: [],//gets populated with prepare
        dest: 'dist/<%= pkg.name.replace(".js", "") %>.js'
      }
    },
    uglify: {
      default: {
        options: {
          banner: '/*! <%= pkg.name.replace(".js", "") %> minified <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          'dist/<%= pkg.name.replace(".js", "") %>.min.js': ['<%= concat.dist.dest %>']
        }
      },
      release: {
        options: {
          banner: '/*! <%= pkg.name.replace(".js", "") %> compressed <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          mangle: true,
          compress: {
            sequences     : true,  // join consecutive statemets with the “comma operator”
            properties    : true,  // optimize property access: a["foo"] → a.foo
            dead_code     : true,  // discard unreachable code
            drop_debugger : true,  // discard “debugger” statements
            unsafe        : false, // some unsafe optimizations (see below)
            conditionals  : true,  // optimize if-s and conditional expressions
            comparisons   : true,  // optimize comparisons
            evaluate      : true,  // evaluate constant expressions
            booleans      : true,  // optimize boolean expressions
            loops         : true,  // optimize loops
            unused        : true,  // drop unused variables/functions
            hoist_funs    : true,  // hoist function declarations
            hoist_vars    : false, // hoist variable declarations
            if_return     : true,  // optimize if-s followed by return/continue
            join_vars     : true,  // join var declarations
            cascade       : true,  // try to cascade `right` into `left` in sequences
            side_effects  : true,  // drop side-effect-free statements
            warnings      : true,  // warn about potentially dangerous optimizations/code
          }
        },
        files: {
          'dist/<%= pkg.name.replace(".js", "") %>.compressed.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    qunit: {
      files: ['test/*.html']
    },

    jshint: {
      files: [],//gets populated with prepare
      options: {
        globals: {
          console: true,
          module: true,
          document: true
        },
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['prepare', 'concat', 'jshint', 'qunit']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadTasks('./tasks');

  grunt.registerTask('test', ['prepare','jshint', 'qunit']);
  grunt.registerTask('default', ['prepare', 'jshint', 'concat', 'qunit', 'uglify:default']);
  grunt.registerTask('release', ['prepare', 'jshint', 'concat', 'qunit', 'uglify:release']);
};
