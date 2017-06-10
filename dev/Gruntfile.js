module.exports = function(grunt) {

    // Configurable paths for the application
    var appConfig = {
            app: 'dev',
            dist: '../public',
            hlp: {
                bowerPath: './bower_components',
                bowerJS: [
                    'bootstrap-sass/assets/javascripts/bootstrap.js',
                    'jquery/dist/jquery.js'
                ],
                pathRemove: ['bootstrap-sass/assets/fonts']
            }
        },
        // remove unnecessary subdirectories
        removePath = function (dest, src) {
            var paths = appConfig.hlp.pathRemove;

            paths.every(function(element, index, array) {
                if (src.indexOf(element) > -1) {
                    // The `src` is being renamed; the `dest` remains the same
                    src = src.replace(element, '');
                }
            });
            return dest + src;
        };

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Project settings
        conf: appConfig,


        // Coffee plugin
        coffee: {
            compile: {
                files: {
                    'js/script/coffee.js': ['_coffee/*.coffee', '_coffee/**/*.coffee']
                }
            }
        },

        // Compass plugin
        compass: {
            // Build the minified css
            dist: {
                options: {
                    banner: '/*!\n' +
                    ' * <%= pkg.name %>\n' +
                    ' * <%= pkg.url %>\n' +
                    ' * @author <%= pkg.author %>\n' +
                    ' * @author-url <%= pkg.authorUrl %>\n' +
                    ' * @version <%= pkg.version %>\n' +
                    ' */\n',
                    relativeAssets: true,
                    sassDir: '_sass',
                    cssDir: '<%= conf.dist %>/css',
                    imagesDir: '<%= conf.dist %>/img',
                    fontsDir: '<%= conf.dist %>/fonts/',
                    environment: 'production',
                    specify: '_sass/*.min.scss'
                }
            },
            // Build not minified css
            build: {
                options : {
                    relativeAssets: '<%= compass.dist.options.relativeAssets %>',
                    sassDir: '<%= compass.dist.options.sassDir %>',
                    cssDir: '<%= compass.dist.options.cssDir %>',
                    imagesDir: '<%= compass.dist.options.imagesDir %>',
                    fontsDir: '<%= compass.dist.options.fontsDir %>',
                    noLineComment: true,
                    environment: 'development',
                    specify: '_sass/*.scss'
                }
            }
        },

        // fonts-face generator
        fontface: {
            dist: {
                options: {
                    fontDir: 'fonts',
                    outputFile: '_sass/_quarks/fonts.scss',
                    template:
                    '@include font-face("' +
                    '{{font}}", font-files(' +
                    '"{{font}}.woff", ' +
                    '"{{font}}.ttf", ' +
                    '"{{font}}.svg#{{font}}"), ' +
                    '"{{font}}.eot");'
                }
            }
        },

        // Concat plugin
        concat: {
            compact: {
                options: {
                    separator: ';'
                },
                // Uncomment if you want to get compact.js that contains all js files from folder
                src: ['!js/libs/**/*.js', '!js/script/!**!/!*.js', 'js/assets/!**/!*.js', 'js/!*.js'],
                dest: 'js/built/compact.js'
            },
            js: {
                src: ['js/script/*.js'],
                dest: 'js/app.js'
            }
        },


        // Uglify plugin
        uglify: { // Minify files with UglifyJS.
            options: {
                mangle: {
                    reserved: ['jQuery']
                },
                banner: '/*!\n' +
                ' * <%= pkg.name %>\n' +
                ' * <%= pkg.url %>\n' +
                ' * @author <%= pkg.author %>\n' +
                ' * @author-url <%= pkg.authorUrl %>\n' +
                ' * @version <%= pkg.version %>\n' +
                ' * @updated <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'js',
                        //src: ['libs/*.js', 'assets/*.js', 'built/*.js', '*.js'],
                        src: ['libs/*.js', 'assets/*.js', '!built/*.js', '*.js'],
                        dest: '<%= conf.dist %>/js/min/',
                        ext: '.min.js'
                    }
                ]
            }
        },


        // Bower copy plugin
        copy: {
            bower: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= conf.hlp.bowerPath %>/',
                        src: '**/*.css',
                        dest: '<%= conf.dist %>/css/',
                        flatten: true,
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= conf.hlp.bowerPath %>/',
                        src: '**/*.{svg,eot,ttf,woff,woff2,otf}',
                        dest: '<%= conf.dist %>/fonts/',
                        //flatten: true,
                        filter: 'isFile',
                        rename: removePath
                    },
                    {
                        expand: true,
                        cwd: '<%= conf.hlp.bowerPath %>/',
                        src: '**/*.{png,jpg,gif,ico,jpeg}',
                        dest: '<%= conf.dist %>/img/',
                        //flatten: true,
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: '<%= conf.hlp.bowerPath %>/',
                        src: '<%= conf.hlp.bowerJS %>',
                        dest: 'js/assets/',
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        cwd: 'js/',
                        src: '**/*.js',
                        dest: '<%= conf.dist %>/js/',
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            }
        },


        // Jshint plugin
        jshint: { // Validate files with JSHint.
            all: ['Gruntfile.js', 'js/**/*.js', '!js/built/compact.js', '!js/assets/**/*.js']
        },


        // Assemble template html
        assemble: {
            options: {
                flatten: true,
                partials: ['_templates/_includes/**/*.hbs'],
                layoutdir: '_templates/_layouts',
                layout: 'default.hbs'
            },
            site: {
                files: {'<%= conf.dist %>/': ['_templates/_pages/*.hbs']}
            }
        },


        // Injector (for including js/css files to html dynamically)
        injector: {
            options: {
                addRootSlash: false,
                ignorePath: '<%= conf.dist %>'
            },
            local_dependencies: {
                files: {
                    '_templates/_includes/head.hbs': [
                        '<%= conf.dist %>/js/min/assets/**/jquery.min.js',
                        '<%= conf.dist %>/js/min/assets/**/*.min.js',
                        '<%= conf.dist %>/js/min/**/*.min.js',
                        '!<%= conf.dist %>/js/min/**/compact.min.js',
                        '<%= conf.dist %>/css/**/*.min.css',
                        '!<%= conf.dist %>/css/**/bootstrap.min.css'
                    ]
                }
            }
        },


        // Watch plugin
        watch: {
            options: {
                livereload: true // <script src="//localhost:35729/livereload.js"></script>
            },

            // Watch css
            css: {
                files: ['_sass/*.scss', '_sass/**/*.scss'],
                tasks: ['compass:dist']
            },

            // Watch js
            js: {
                files: ['js/**/*.js', 'js/*.js', 'Gruntfile.js' ],
                tasks: ['concat:js', 'jshint', 'newer:uglify']
            },

            // Watch HandleBarScript
            hbs: {
                files: ['_templates/**/*.hbs', '_templates/*.hbs'],
                tasks: ['assemble']
            },

            // Watch coffee
            scripts: {
                files: ['_coffee/*.coffee'],
                tasks: [ 'newer:coffee' ]
            }
        }

    });


    // NPM tasks
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-fontface');



    // Default tasks on running.
    grunt.registerTask('default', ['coffee', 'uglify', 'injector', 'assemble']);

    // Task for build fonts
    grunt.registerTask('fonts', ['fontface']);

    // Task for inject to html js/css files
    grunt.registerTask('inject', ['injector']);

    // Task for build bower components
    grunt.registerTask('bower:update', ['copy:bower']);

    // Task for build public version of js
    grunt.registerTask('build', ['newer:coffee', 'copy:js', 'concat:js', 'concat:compact', 'compass:build', 'assemble', 'uglify']);

};
