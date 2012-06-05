function Utils() {
	"use strict";

	/*Flag used to warn user only once*/
	var brokenArrow = false;

	/* 
	Inform user that the content and format of the page has changed and that the
	extension seems to be no more compatible with it.
	*/
	this.alertBrokenAPI = function(message) {
		if (brokenArrow) {
			throw new Error("Broken API");
		}
		brokenArrow = true;
		log("Please contact the author of the extension and send him the current log:");
		log(message);
		alert("TrelloScrum can't handle that version of Trello. Please disable the extension.\nGo to: chrome://settings/extensions#\n\nLog: "+message);
		throw new Error("Broken API");
	};

	this.log = function(category, message) {
		if (console && console.log) {
			if (typeof(message) == "string") {
				console.log(new Date()+" :: "+category+" :: "+message);
			} else {
				console.log(new Date()+" :: "+category);
				console.log(message);
			}
		}
	};

	this.isNumber=function(text) {
		return !isNaN(Number(text));
	};
	this.sameSign = function(a,b) {
		if (a>=0) return b >=0;
		else return b <=0;
	};
}
