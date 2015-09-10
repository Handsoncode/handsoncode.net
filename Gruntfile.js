
module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            options: {
                paths: ["css"]
            },
            files: {
                "dist/css": "css"
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '',
                    dest: 'dist',
                    src: [
                        'images/**',
                        'js/**',
                        'css/**.css',
                        '*.html',
                        '*.txt'
                    ]
                }]
            }
        },
        connect: {
            dist: {
                options: {
                    port: 5457,
                    hostname: '0.0.0.0',
                    base: 'dist',
                    keepalive: true
                }
            }
        },
        open: {
            dist: {
                path: 'http://localhost:5457'
            }
        }
    });

    grunt.registerTask('build', [
        'less',
        'copy'
    ]);

    grunt.registerTask('server', [
        'build',
        'connect'
    ]);

    grunt.registerTask('default', 'server');

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-copy');
};