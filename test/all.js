module( "Test RatioUtil", {
  setup: function() {
    // prepare something for all following tests
    this.RatioUtil = zther.util.RatioUtil;
  },
  teardown: function() {
    // clean up after each test
  }
});

test("RatioUtil exists", function() {
  ok(zther.util.RatioUtil);
});

test("widthToHeight", function(){
	equal( this.RatioUtil.widthToHeight({width:100,height:50}) , 2);
});

test("heightToWidth", function(){
	equal( this.RatioUtil.heightToWidth({width:50,height:50}) , 1);
})

module( "Test NumberUtil", {
  setup: function() {
    // prepare something for all following tests
    this.NumberUtil = zther.util.NumberUtil;
  },
  teardown: function() {
    // clean up after each test
  }
});

test("NumberUtil exists", function() {
  ok(zther.util.NumberUtil);
});

test("isEven", function(){
	equal( this.NumberUtil.isEven(7), false );
    equal( this.NumberUtil.isEven(12), true );
});

module( "Test Geom", {
  setup: function() {
    // prepare something for all following tests
    this.Rectangle = zther.geom.Rectangle;
    this.Point = zther.geom.Point;
  },
  teardown: function() {
    // clean up after each test
  }
});

test("Test if rectangle exists", function(){
  ok(this.Rectangle);
});

test("Check contains", function(){
  var rect = new this.Rectangle(10,10,50,50);

      equal(rect.contains(60,60), true);
      equal(rect.contains(10,10), true);
      equal(rect.contains(20,61), false);
});

test("Check contains point", function(){
  var rect = new this.Rectangle(10,10,50,50);

      equal(rect.containsPoint(new this.Point(60,60)), true);
      equal(rect.containsPoint(new this.Point(10,10)), true);
      equal(rect.containsPoint(new this.Point(20,61)), false);

      try{
        rect.containsPoint(20,61);
      }catch(e){
        equal(e, "zther.geom.Rectangle.containsPoint() method requires instance of zther.geom.Point");
      }
});