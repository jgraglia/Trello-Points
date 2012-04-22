$(document).ready(function() {
	module("numericpointpicker.js");

	var numericPointPicker = new NumericPointPicker();
	test("parse points from string", function() {
		var points=numericPointPicker.parsePointPickerFrom("0,1,2,3,4,5");
		equal($.isArray(points),true);
		equal(points.length,6);
		equal(points[0], 0);
		equal(points[1], 1);
		equal(points[2], 2);
		equal(points[3], 3);
		equal(points[4], 4);
		equal(points[5], 5);
	});
	
	test("parse points keep only number items", function() {
		var points=numericPointPicker.parsePointPickerFrom("0,hello,5");
		equal($.isArray(points),true);
		equal(points.length,2);
		equal(points[0], 0);
		equal(points[1], 5);
	});
	test("parse points trim item before number conversion", function() {
		var points=numericPointPicker.parsePointPickerFrom(" 0, 1   , 67");
		equal($.isArray(points),true);
		equal(points.length,3);
		equal(points[0], 0);
		equal(points[1], 1);
		equal(points[2], 67);
	});
	test("parse points allow decimal values", function() {
		var points=numericPointPicker.parsePointPickerFrom(" 0, 1.5   , 9.37");
		equal($.isArray(points),true);
		equal(points.length,3);
		equal(points[0], 0);
		equal(points[1], 1.5);
		equal(points[2], 9.37);
	});
});
