function AlphaNumericPointPicker() {
	"use strict";
	var pointSeq = [0, 1, 2, 3, 5, 8, 13, 20];
	var parser = numericAndAlphaParser;
	var that=this;
	this.showPointPicker = function() {
		// check if already installed
		if($(this).find('.picker').length) {
			return;
		}
	
		var pickers = '<span class="point-value">?</span> ';
		for (var i=0; i < pointSeq.length; i++) {
			pickers += '<span class="point-value">' + pointSeq[i] + '</span> ';
		}
		var picker = "<div class='picker'>" + pickers + "</div>";
		$(".card-detail-title .edit-controls").append(picker);
		$(".point-value").click(that.updatePoint);
	};

	this.updatePoint = function(){
		var value = $(this).text();
		var $text = $(".card-detail-title .edit textarea");
		if ($text.length==0) {
			alertBrokenAPI("Point Picker : text not found");
			return;
		}
		var text = $text.val();
	
		// replace our new
		$text[0].value=parser.parsePoints(text)?text.replace(parser.reg, '('+value+') '):text+' ('+value+')';
	
		// then click our button so it all gets saved away
		$(".card-detail-title .edit .js-save-edit").click();
	
		return false;
	};

	this.parsePointPickerFrom = function(text) {
		var stringArray= text.split(',');
		var pointsArray = [];
		for (var i=0; i < stringArray.length; i++) {
			var val = $.trim(stringArray[i]);
			if (utils.isNumber(val)) {
				pointsArray.push(Number(val));
			} else pointsArray.push(val);
		}
		return pointsArray;
	};
	
	this.setSequence=function(sequence) {
		pointSeq = sequence;
	};
}