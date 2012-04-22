$(document).ready(function() {
	var utils = new Utils();

	module("list.js");

	test("constructor", function() {
		$list = $("<span>");
		var list = new List($list,mockInactiveFilter, false);
		expect(0) ;
	});
	test("constructor : debug is optional", function() {
		$list = $("<span>");
		var list = new List($list,mockInactiveFilter);
		expect(0) ;
	});
	test("illegal constructor args", function() {
		  raises(function() {
			  new List(null, mockInactiveFilter, false);
		  }, "jQuery list element is mandatory");
		  raises(function() {
			  new List("", mockInactiveFilter, false);
		  }, "jQuery list element is mandatory");
		  raises(function() {
			  new List($("<span>"), null, false);
		  }, "jQuery list element is mandatory");
	});
	test("scores with multiples cards", function() {
		var $list = mockListElt();
		$list.append(mockCardElt("lorem ipsum (5)"));
		$list.append(mockCardElt("lorem ipsum (19.3)"));
		$list.append(mockCardElt("lorem ipsum (.2)"));
		$list.append(mockCardElt("lorem ipsum (0)"));
		$list.append(mockCardElt("lorem ipsum (?)"));
		$list.append(mockCardElt("lorem ipsum"));

		var list = new List($list, mockInactiveFilter, true);
		var scores = list.computeScores();
		
		equal(scores.global, 24.5);
		equal(scores.filtered, 24.5);
	});
	test("scores with multiples cards, when filtered", function() {
		var $list = mockListElt();
		
		$list.append(mockCardElt("lorem ipsum (5)").addClass("matched-card"));
		$list.append(mockCardElt("lorem ipsum (19.3)"));
		$list.append(mockCardElt("lorem ipsum (.2)").addClass("matched-card"));
		$list.append(mockCardElt("lorem ipsum (0)"));
		$list.append(mockCardElt("lorem ipsum (?)"));
		$list.append(mockCardElt("lorem ipsum"));

		var list = new List($list, mockActiveFilter, true);
		var scores = list.computeScores();
		
		equal(scores.global, 24.5, "global score");
		equal(scores.filtered, 5.2, "filtered score");
	});
	test("scores are rounded", function() {
		var $list = mockListElt();
		
		$list.append(mockCardElt("lorem ipsum (1.234)"));
		$list.append(mockCardElt("lorem ipsum (2.8792)").addClass("matched-card"));

		var list = new List($list, mockActiveFilter, true);
		var scores = list.computeScores();
		
		equal(scores.global, 4.11, "global score");
		equal(scores.filtered, 2.87, "filtered score");
	});	
});
