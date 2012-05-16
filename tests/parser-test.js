$(document).ready(function() {

	function assertPoint(parseResult, text, value) {
		equal($.isArray(parseResult), true, "an array was expected");
		equal(parseResult.length, 2,"2 elts required in array");
		equal(parseResult[0], text);
		equal(parseResult[1], value);
	};
	function assertNoPoint(parseResult) {
		equal($.isArray(parseResult), false);
		equal(parseResult, null);
		equal(parseResult?true:false, false);
	};

	function defaultTests(parser) {
		test("Card with positive points", function() {
			var parsed=parser.parsePoints("Hello World (2)");
			assertPoint(parsed, "(2)", 2);
		});
		test("Card with decimal positive points (EN)", function() {
			var parsed=parser.parsePoints("Hello World (8.9)");
			assertPoint(parsed, "(8.9)", 8.9);
		});
		test("Card with no points", function() {
			var parsed=parser.parsePoints("Hello World");
			assertNoPoint(parsed);
		});
		test("Card with special unknown character", function() {
			var parsed=parser.parsePoints("Hello World (?)");
			assertPoint(parsed, "(?)", "?");
		});
		test("Card with incomplete pattern 1", function() {
			var parsed=positiveNumericParser.parsePoints("Hello World (4");
			assertNoPoint(parsed);
		});
		test("Card with incomplete pattern 2", function() {
			var parsed=positiveNumericParser.parsePoints("Hello World 4)");
			assertNoPoint(parsed);
		});

	}
	module("parser.js : positiveNumericParser");
	
	defaultTests(positiveNumericParser);
	
	test("Card with negative points are not allowed", function() {
		var parsed=positiveNumericParser.parsePoints("Hello World (-65)");
		assertNoPoint(parsed);
	});
	/* Yuck...not supported... */
	test("Card with decimal positive points (FR) does not work", function() {
		var parsed=positiveNumericParser.parsePoints("Hello World (8,9)");
		assertNoPoint(parsed);
	});
		
	module("parser.js : signedNumericParser");
	//defaultTests(signedNumericParser);
	test("Card with negative points are allowed", function() {
		var parsed=signedNumericParser.parsePoints("Hello World (-65)");
		assertPoint(parsed, "(-65)", -65);
	});
	test("Card with decimal positive points (FR) does not work", function() {
		var parsed=signedNumericParser.parsePoints("Hello World (18,9)");
		assertPoint(parsed, "(18,9)", 18.9);
	});
	
	module("parser.js : numericAndAlphaParser");
	defaultTests(numericAndAlphaParser);
	test("Card with negative points are allowed", function() {
		var parsed=numericAndAlphaParser.parsePoints("Hello World (-65)");
		assertPoint(parsed, "(-65)", -65);
	});
	test("Card with decimal positive points (FR) does not work", function() {
		var parsed=numericAndAlphaParser.parsePoints("Hello World (12,9)");
		assertPoint(parsed, "(12,9)", 12.9);
	});
});
