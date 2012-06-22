$(document).ready(function() {

	
	module("utils.js");

	var utils = new Utils();

	test("same sign with positive numbers", function() {
		equal(true, utils.sameSign(3, 9));
		equal(true, utils.sameSign(3.8, 9));
	});
	test("same sign with negative numbers", function() {
		equal(true, utils.sameSign(-3, -9));
		equal(true, utils.sameSign(-3.8, -9));
	});

	test("same sign with zero", function() {
		equal(true, utils.sameSign(-3, 0));
		equal(true, utils.sameSign(3.8, 0));
	});

	test("different signs", function() {
		equal(false, utils.sameSign(-3, 9.3));
		equal(false, utils.sameSign(3.8, -5));
	});

	test("is number with... a number", function() {
		equal(true, utils.isNumber(-3));
		equal(true, utils.isNumber(98));
	});
	test("is number with... a number as a text", function() {
		equal(true, utils.isNumber("-3"));
		equal(true, utils.isNumber("98"));
	});
	test("is number with... a number as a text", function() {
		equal(false, utils.isNumber("-c3"));
		equal(false, utils.isNumber("c98"));
	});
	test("is number with... Nan", function() {
		var nan = 9/'c'
		equal(false, utils.isNumber(nan));
	});
});
