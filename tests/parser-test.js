$(document).ready(function() {
	module("parser.js");

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
	test("Card with positive points", function() {
		var parsed=numericParser.parsePoints("Hello World (2)");
		assertPoint(parsed, "(2)", 2);
	});
	/* As of march 2012, negative points are not (yet) handled... */
	test("Card with negative points are not allowed", function() {
		var parsed=numericParser.parsePoints("Hello World (-65)");
		assertNoPoint(parsed);
	});
	test("Card with decimal positive points (EN)", function() {
		var parsed=numericParser.parsePoints("Hello World (8.9)");
		assertPoint(parsed, "(8.9)", 8.9);
	});
	/* Yuck...not supported... */
	test("Card with decimal positive points (FR) does not work", function() {
		var parsed=numericParser.parsePoints("Hello World (8,9)");
		assertNoPoint(parsed);
	});
	test("Card with no points", function() {
		var parsed=parser.parsePoints("Hello World");
		assertNoPoint(parsed);
	});
	test("Card with special unknown character", function() {
		var parsed=numericParser.parsePoints("Hello World (?)");
		assertPoint(parsed, "(?)", "?");
	});
	test("Card with illegal pattern", function() {
		var parsed=numericParser.parsePoints("Hello World (4");
		assertNoPoint(parsed);
	});
});
