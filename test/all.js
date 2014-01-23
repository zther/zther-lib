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
    this.Polygon = zther.geom.Polygon;
    this.Square = zther.geom.Square;
    this.Ellipse = zther.geom.Ellipse;
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

test("Test Ellipse", function(){
  var ellipse = new this.Ellipse(10, 10, 10, 10);

      equal(ellipse.size.x, 10);
      equal(ellipse.containsPoint(new this.Point(10,10) ), false);
      equal(ellipse.containsPoint(new this.Point(15,15) ), true);
      var truePoint = new this.Point(15,10);
      var pointOfDegree = ellipse.getPointOfDegree(0);
      equal(pointOfDegree.x, truePoint.x );
      equal(pointOfDegree.y, truePoint.y );
      var truePoint = new this.Point(20,15);
      var pointOfDegree = ellipse.getPointOfDegree(90);
      equal(pointOfDegree.x, truePoint.x );
      equal(pointOfDegree.y, truePoint.y );
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

test("Check Ploygon contains point", function(){

  var polygon = new this.Polygon([new this.Point(1,2), new this.Point(4,3), new this.Point(6,5), new this.Point(4,1) ]);

      equal( polygon.containsPoint( new this.Point(1,1) ), false );
      equal( polygon.containsPoint( new this.Point(3,2) ), true );
      equal( polygon.containsPoint( new this.Point(5,3) ), true );
      equal( polygon.containsPoint( new this.Point(5,2) ), false );

});

test("Check Square contains point", function(){

  var a = new this.Point(73.18847188039956, 229.78436810658908);
  var b = new this.Point(330.2156318934109, -6.811528119600467);
  var c = new this.Point(566.8115281196004, 250.2156318934109);
  var d = new this.Point(309.7843681065891, 486.81152811960044);

  var square = new this.Square([a,b,c,d]);

      equal( square.containsPoint( new this.Point(100,100) ), false );
      equal( square.containsPoint( new this.Point(300,200) ), true );
      equal( square.containsPoint( new this.Point(400,300) ), true );
      equal( square.containsPoint( new this.Point(400,0) ), false );

});

module( "Test GeomUtil", {
  setup: function() {
    // prepare something for all following tests
    this.GeomUtil = zther.util.GeomUtil;
  },
  teardown: function() {
    // clean up after each test
  }
});

test("GeomUtil exists", function() {
  ok(zther.util.GeomUtil);
});

test("GeomUtil exists", function() {
  equal(this.GeomUtil.normalizeDegree(-90), 270 );
  equal(this.GeomUtil.normalizeDegree(1080), 0 );
});