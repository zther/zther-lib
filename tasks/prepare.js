module.exports = function(grunt) {
	grunt.registerTask('prepare', 'iterates over all src directories and compiles modules js files', function() {

	    // read all subdirectories from your modules folder
	    grunt.file.expand('./src/**/*.js').forEach(function(file){

	        var concat = grunt.config.get('concat') || {};
	        var jshint = grunt.config.get('jshint') || {};

	        concat.dist.src.push(file);
	        jshint.files.push(file);
	        
	         grunt.config.set('concat', concat);
	         grunt.config.set('jshint', jshint);
	    });
	
	});

}