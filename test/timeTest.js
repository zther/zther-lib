(function() {

  var Tick, Interval;

  module( "test time", {
    setup: function() {
      // prepare something for all following tests
      Tick = zther.time.Tick;
      Interval = zther.time.Interval;
    },
    teardown: function() {
      // clean up after each test
    }
  });

  test("exists", function() {
    ok( Tick, Interval );
  });

  asyncTest("test tick", function(){
  	expect(2);
  	
  	var updateCount = 0;
  	var tick = new Tick(null, 100, 3);
  		
  		tick.updated.add(function(){

  			updateCount++;
  			if(updateCount == 3){
  				ok(true, 'updated 3 times');
  			}
  		});
  		tick.completed.add(function(){
  			
  			ok(true, 'completed');
  			
  			QUnit.start();
  		});
  		tick.start();
  });

  asyncTest("test setTimeout", function(){
  	expect(1);
  	Interval.setTimeout(function(args){
  		if(args[0] == 'foo'){
  			ok(true, 'arguments passed');
  			QUnit.start();
  		}
  	},100, ['foo']);
  });

  asyncTest("test setInterval", function(){
  	expect(1);

  	var updateCount = 0;
  	var interval = Interval.setInterval(function(args){
  		
  		updateCount++;

  		if(updateCount == 3){
  			interval.stop();
  			if(args[0] == 'bar'){
  				ok(true, 'arguments passed');
  			}
  			QUnit.start();
  		}

  	},100, ['bar']);
  });

})();