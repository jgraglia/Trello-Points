/* parse regexp- accepts digits, decimals and '?' */
var numericRegexp=/\((\x3f|\d*\.?\d+)\)\s?/m;
var numericAndAlphaRegexp=/\((.*)\)\s?/m;

var numericParser = new Object();
numericParser.reg = numericRegexp;
numericParser.parsePoints = function(text) {
	return text.match(numericRegexp);
};


var numericAndAlphaParser = new Object();
numericAndAlphaParser.reg = numericAndAlphaRegexp;
numericAndAlphaParser.parsePoints = function(text) {
	return text.match(numericAndAlphaRegexp);
};


var parser = numericAndAlphaParser;
