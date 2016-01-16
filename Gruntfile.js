module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    aws: grunt.file.readJSON('aws-keys.json'), // Read the file

    aws_s3: {
      options: {
        accessKeyId: '<%= aws.AWSAccessKeyId %>', // Use the variables
        secretAccessKey: '<%= aws.AWSSecretKey %>', // You can also use env variables
        region: 'us-west-1',
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5 // 5 simultaneous downloads
      },
      production: {
        options: {
          bucket: 'hahavoiceovers.com'
        },
        files: [
          {expand: true, cwd: './', src: ['bundle.js'], dest: ''},
          {expand: true, cwd: './', src: ['index.html'], dest: ''},
          {expand: true, cwd: 'public', src: ['main.css'], dest: 'public'}

          // CacheControl only applied to the assets folder
          // LICENCE inside that folder will have ContentType equal to 'text/plain'
        ]
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'public',
          src: ['main.css'],
          dest: 'public',
          ext: '.min.css'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('pushS3', ['cssmin', 'aws_s3']);
  grunt.registerTask('minify', ['cssmin']);

};

