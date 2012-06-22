/* parse regexp- accepts digits, decimals and '?' */
var positiveNumericRegexp=/\((\x3f|\d*\.?\d+)\)$\s?/m;
var signedNumericRegexp=/\((.*)\)$\s?/m;
var numericAndAlphaRegexp=/\((.*)\)$\s?/m;

var positiveNumericParser = new Object();
positiveNumericParser.reg = positiveNumericRegexp;
positiveNumericParser.parsePoints = function(text) {
	return text.match(this.reg);
};
positiveNumericParser.toString = function() {return "positiveNumericParser";}

var signedNumericParser = new Object();
signedNumericParser.utils = new Utils();
signedNumericParser.reg = signedNumericRegexp;
signedNumericParser.frToEnNumber=function(frNumberAsText) {
	frNumberAsText =  frNumberAsText.replace(',', '.');
	return Number(frNumberAsText);
};
signedNumericParser.parsePoints = function(text) {
	var values= text.match(this.reg);
	if ($.isArray(values)) {
		var toFrNumber = this.frToEnNumber(values[1]);
		if (this.utils.isNumber(toFrNumber)) values[1] = toFrNumber;
	}
	return values;
};
signedNumericParser.toString = function() {return "signedNumericParser";}

var numericAndAlphaParser = new Object();
numericAndAlphaParser.reg = numericAndAlphaRegexp;
numericAndAlphaParser.utils = new Utils();
numericAndAlphaParser.frToEnNumber=function(frNumberAsText) {
	frNumberAsText =  frNumberAsText.replace(',', '.');
	return Number(frNumberAsText);
};
numericAndAlphaParser.parsePoints = function(text) {
	var values= text.match(this.reg);
	if ($.isArray(values)) {
		var toFrNumber = this.frToEnNumber(values[1]);
		if (this.utils.isNumber(toFrNumber)) values[1] = toFrNumber;
	}
	return values;
};
numericAndAlphaParser.toString = function() {return "numericAndAlphaParser";}


var parser = numericAndAlphaParser;
