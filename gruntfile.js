module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            templates: {
                files: ['./app/partials/**/*.html', './app/templates/**/*.html'],
                tasks: ['ngtemplates']
            },
            scripts: {
                files: ['./app/js/**/*.js'],
                tasks: ['requirejs']
            },
            styles: {
                files: ['./app/css/**/*.scss'],
                tasks: ['sass']
            }
        },
        ngtemplates: {
            app: {
                cwd: './app',
                src: ['partials/**/*.html', 'templates/**/*.html'],
                dest: './app/js/templates.js',
                options: {
                    bootstrap:  function(module, script) {
                        return 'define([\'angular\', \'app\'], function(angular, app) { app.run([\'$templateCache\', function($templateCache) {' + script + '}]); });';
                    }
                },
                htmlmin: {
                    collapseBooleanAttributes:      true,
                    collapseWhitespace:             true,
                    removeAttributeQuotes:          true,
                    removeComments:                 true,
                    removeEmptyAttributes:          true,
                    removeRedundantAttributes:      true,
                    removeScriptTypeAttributes:     true,
                    removeStyleLinkTypeAttributes:  true
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    mainConfigFile: "./app/js/main.js",
                    optimize: "uglify",
                    name: "main",
                    out: "./app/js/main.min.js",
                    preserveLicenseComments: false
                }
            }
        },
        sass: {
            options: {
                style: 'compressed'
            },
            dev: {
                src: './app/css/style.scss',
                dest: './app/css/style.min.css'
            },
            'umaine-scheme': {
                src: './app/css/schemes/umaine.scss',
                dest: './app/css/style-umaine.min.css'
            },
            'bu-scheme': {
                src: './app/css/schemes/bu.scss',
                dest: './app/css/style-bu.min.css'
            }
        },
        imagemin: {
            prod: {
                options: {
                    optimizationLevel: 7,
                    cache: false
                },
                files: [{
                    expand: true,
                    src: ['./app/img/**/*.{png,jpg,gif}'],
                    dest: '.'
                }]
            }
        },
        aws: grunt.file.readJSON('./grunt-aws.json'),
        s3: {
            options: {
                key: '<%= aws.key %>',
                secret: '<%= aws.secret %>',
                bucket: '<%= aws.bucket %>',
                access: 'public-read',
                // headers set to expire in 2 weeks
                headers: {
                    "Cache-Control": "max-age=1209600, public",
                    "Expires": new Date(Date.now() + 1209600000).toUTCString()
                }
            },
            prod: {
                sync: [
                    {
                        src: './app/js/main.min.js',
                        dest: 'js/main.min.js',
                        options: {
                            gzip: true,
                            verify: true
                        }
                    },
                    {
                        src: './app/css/*.css',
                        dest: 'css',
                        options: {
                            gzip: true,
                            verify: true
                        }
                    },
                    {
                        src: './app/img/**/*.{png,jpg,gif}',
                        dest: 'img',
                        options: { verify: true }
                    }
                ]
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-angular-templates');

    // Production mode tasks
    grunt.registerTask('prod', ['sass', 'ngtemplates', 'requirejs', 'imagemin', 's3']);

    // Dev mode tasks
    grunt.registerTask('default', ['sass', 'ngtemplates', 'requirejs']);

};