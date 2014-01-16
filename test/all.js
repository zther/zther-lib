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