(function() {

	var ArrayUtil;

	module( "Test ArrayUtil", {
		setup: function() {
			// prepare something for all following tests
			ArrayUtil = zther.util.ArrayUtil;
		},
		teardown: function() {
			// clean up after each test
		}
	});

	test("ArrayUtil exists", function() {
		ok( ArrayUtil );
	});

	test("widthToHeight", function(){
		var employees=[]
				employees[0]={name:"George", age:32, retiredate:"March 12, 2014"}
				employees[1]={name:"Edward", age:17, retiredate:"June 2, 2023"}
				employees[2]={name:"Christine", age:58, retiredate:"December 20, 2036"}
				employees[3]={name:"Sarah", age:62, retiredate:"April 30, 2020"}

		ArrayUtil.sortByKey(employees, 'age');

		equal( employees[0].name, "Edward" );
		equal( employees[3].name, "Sarah" );

	});

})();
