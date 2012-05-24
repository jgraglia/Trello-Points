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

	test("scores with multiples cards, including negative points", function() {
		var $list = mockListElt();
		$list.append(mockCardElt("lorem ipsum (5)"));
		$list.append(mockCardElt("lorem ipsum (-13)"));
		$list.append(mockCardElt("lorem ipsum (19.3)"));
		$list.append(mockCardElt("lorem ipsum (.2)"));
		$list.append(mockCardElt("lorem ipsum (0)"));
		$list.append(mockCardElt("lorem ipsum (?)"));
		$list.append(mockCardElt("lorem ipsum"));

		var list = new List($list, mockInactiveFilter, true);
		var scores = list.computeScores();
		
		equal(scores.global, 11.5);
		equal(scores.filtered, 11.5);
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

	test("scores with multiples cards, including negative points, when filtered", function() {
		var $list = mockListElt();

		$list.append(mockCardElt("lorem ipsum (-3.1)").addClass("matched-card"));		
		$list.append(mockCardElt("lorem ipsum (5)").addClass("matched-card"));
		$list.append(mockCardElt("lorem ipsum (19.3)"));
		$list.append(mockCardElt("lorem ipsum (.2)").addClass("matched-card"));
		$list.append(mockCardElt("lorem ipsum (0)"));
		$list.append(mockCardElt("lorem ipsum (?)"));
		$list.append(mockCardElt("lorem ipsum"));

		var list = new List($list, mockActiveFilter, true);
		var scores = list.computeScores();
		
		equal(scores.global, 21.4, "global score");
		equal(scores.filtered, 2.1, "filtered score");
	});

	test("scores with negative points, when filtered", function() {
		var $list = mockListElt();

		$list.append(mockCardElt("lorem ipsum (-3.1)").addClass("matched-card"));		
		$list.append(mockCardElt("lorem ipsum (-5)").addClass("matched-card"));
		$list.append(mockCardElt("lorem ipsum (-19.3)"));
		$list.append(mockCardElt("lorem ipsum (-.2)").addClass("matched-card"));
		$list.append(mockCardElt("lorem ipsum (0)"));
		$list.append(mockCardElt("lorem ipsum (?)"));
		$list.append(mockCardElt("lorem ipsum"));

		var list = new List($list, mockActiveFilter, true);
		var scores = list.computeScores();
		
		equal(scores.global, -27.6, "global score");
		equal(scores.filtered, -8.3, "filtered score");
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
	
	test("title filtered, no percent", function() {
		var $list = mockListElt();
		
		$list.append(mockCardElt("lorem ipsum (1.234)"));
		$list.append(mockCardElt("lorem ipsum (2.8792)").addClass("matched-card"));

		var list = new List($list, mockActiveFilter, true);
		var scores = {};
		scores.filtered= 6.9;
		scores.global=13.4;
		var modes = {};
		modes.filter_and_global=true;
		modes.percent=false;
		var total = list.computeTotalText(scores, modes);	
		equal(total, "6.9/13.4");
	});

	test("title filtered, with percent", function() {
		var $list = mockListElt();
		
		$list.append(mockCardElt("lorem ipsum (1.234)"));
		$list.append(mockCardElt("lorem ipsum (2.8792)").addClass("matched-card"));

		var list = new List($list, mockActiveFilter, true);
		var scores = {};
		scores.filtered= 6.9;
		scores.global=13.4;
		var modes = {};
		modes.filter_and_global=true;
		modes.percent=true;
		var total = list.computeTotalText(scores, modes);	
		equal(total, "6.9/13.4 [51.49%]");
	});

	test("title filtered (both negative), with percent", function() {
		var $list = mockListElt();
		
		$list.append(mockCardElt("lorem ipsum (1.234)"));
		$list.append(mockCardElt("lorem ipsum (2.8792)").addClass("matched-card"));

		var list = new List($list, mockActiveFilter, true);
		var scores = {};
		scores.filtered= -6.9;
		scores.global=-13.4;
		var modes = {};
		modes.filter_and_global=true;
		modes.percent=true;
		var total = list.computeTotalText(scores, modes);	
		equal(total, "-6.9/-13.4 [51.49%]");
	});

	test("title filtered (only one is negative), with percent", function() {
		var $list = mockListElt();
		
		$list.append(mockCardElt("lorem ipsum (1.234)"));
		$list.append(mockCardElt("lorem ipsum (2.8792)").addClass("matched-card"));

		var list = new List($list, mockActiveFilter, true);
		var scores = {};
		scores.filtered= -6.9;
		scores.global=13.4;
		var modes = {};
		modes.filter_and_global=true;
		modes.percent=true;
		equal(list.computeTotalText(scores, modes), "-6.9/13.4");

		scores.filtered= 6.9;
		scores.global=-13.4;
		equal(list.computeTotalText(scores, modes), "6.9/-13.4");
	});
	test("title not filtered", function() {
		var $list = mockListElt();
		
		$list.append(mockCardElt("lorem ipsum (1.234)"));
		$list.append(mockCardElt("lorem ipsum (2.8792)").addClass("matched-card"));

		var list = new List($list, mockActiveFilter, true);
		var scores = {};
		scores.filtered= 13.4;
		scores.global=13.4;
		var modes = {};
		modes.filter_and_global=true;
		modes.percent=true;
		var total = list.computeTotalText(scores, modes);	
		equal(total, "13.4");
	});
});
