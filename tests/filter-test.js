$(document).ready(function() {
	module("filter.js");

	test("constructor", function() {
		var filter = new Filter(false);
		expect(0) ;
	});
	test("default state is not filtered", function() {
		var filter = new Filter(false);
		expect(filter.isCurrentlyFiltered(), false) ;
	});
});
