/* parse regexp- accepts digits, decimals and '?' */
var reg=/\((\x3f|\d*\.?\d+)\)\s?/m;

var parser = new Object();
parser.parsePoints = function(text) {
	return text.match(reg);
};
