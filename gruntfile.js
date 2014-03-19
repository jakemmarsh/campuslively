module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['./app/js/**/*.js'],
                tasks: ['requirejs']
            },
            styles: {
                files: ['./app/css/**/*.scss'],
                tasks: ['sass']
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
                        dest: 'assets/js/main.min.js',
                        options: {
                            gzip: true,
                            verify: true
                        }
                    },
                    {
                        src: './app/css/*.css',
                        dest: 'assets/css',
                        options: {
                            gzip: true,
                            verify: true
                        }
                    },
                    {
                        src: './app/img/**/*.{png,jpg,gif}',
                        dest: 'assets/img',
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

    // Production mode tasks
    grunt.registerTask('prod', ['sass', 'requirejs', 'imagemin', 's3']);

    // Dev mode tasks
    grunt.registerTask('default', ['sass', 'requirejs']);

};