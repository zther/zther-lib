module( "Test namespace", {
  setup: function() {
    // prepare something for all following tests
    //this.namespace = zther.namespace;
  },
  teardown: function() {
    // clean up after each test
  }
});

test("namespace exists", function() {
  ok(zther.namespace);
});

test("test namespace", function(){
	equal(zther.namespace("com.zther.test"), com.zther.test );
});