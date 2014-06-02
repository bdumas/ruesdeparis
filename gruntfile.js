module.exports = function(grunt){

    require('load-grunt-tasks')(grunt);
    
    var conf = {
        jsFiles: ['app/js/install.js', 'app/js/geolocation.js', 'app/js/webapp.js'],
        jsonFiles: ['app/data/ruesdeparis.json'],
        cssFiles: ['app/css/base.css', 'app/css/buttons.css', 'app/css/headers.css', 'app/css/toolbars.css', 'app/css/webapp.css'],
        build: {
            dest: 'dist' 
        }
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        /* TODO meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
              '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
              '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
              '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
              ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> *//*'
        },*/

        jshint: {
            files: ['gruntfile.js', conf.jsFiles]
        },
		
        jsonlint: {
            files: ['package.json', 'app/manifest.webapp', conf.jsonFiles]
        },
        
        csslint: {
            files: conf.cssFiles
        },
        
        clean: {
            options: {
                force: true
            },
            build: conf.build.dest
        },
        
        cssmin: {
            files: {
                src: conf.cssFiles,
                dest: conf.build.dest + '/css/<%= pkg.name %>-<%= pkg.version %>.min.css'
            }
        },
        
        uglify: {
            files: {
                src: conf.jsFiles,
                dest: conf.build.dest + '/js/<%= pkg.name %>-<%= pkg.version %>.min.js'
            }
        },
        
        targethtml: {
            dist: {
                options: {
                    curlyTags: {
                        version: '<%= pkg.version %>'
                    }
                },
                files: [{
                    src: 'app/index.html',
                    dest: conf.build.dest + '/index.html'
                }]
            }
        },
        
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeEmptyAttributes: true
                },
                files: [{
                    src: conf.build.dest + '/index.html',
                    dest: conf.build.dest + '/index.html'
                }]
            }
        },
        
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'app/img/',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: conf.build.dest + '/img/'
                }]
            }
        },
        
        copy: {
            build: {
                files: [
                    {src: 'app/data/ruesdeparis.json', dest: conf.build.dest + '/data/ruesdeparis.json', flatten: true},
                    {src: 'app/fonts/moztt_light-webfont.woff', dest: conf.build.dest + '/fonts/moztt_light-webfont.woff', flatten: true},
                    {src: 'app/fonts/moztt_medium-webfont.woff', dest: conf.build.dest + '/fonts/moztt_medium-webfont.woff', flatten: true},
                    {src: 'app/fonts/moztt_regular-webfont.woff', dest: conf.build.dest + '/fonts/moztt_regular-webfont.woff', flatten: true},
                    {src: 'app/manifest.webapp', dest: 'dist/manifest.webapp'}
                ]
            }
        },
		
        watch: {
            js: {
                files: conf.jsFiles,
                tasks: ['jshint']
            },
            json: {
                files: conf.jsonFiles,
                tasks: ['jsonlint']
            }
        }
    });

    grunt.registerTask('default', ['jshint','jsonlint']);
    grunt.registerTask('build', ['default','clean','imagemin','copy','cssmin','uglify','targethtml','htmlmin']);

};