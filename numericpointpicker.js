
function NumericPointPicker() {
	"use strict";
	var pointSeq = [0, 1, 2, 3, 5, 8, 13, 20];
	var parser = numericParser;
	var that=this;
	var debug=false;
	
	var pickerElement;
	
	var log = function(message) {
		tp.utils.log("Numeric point picker", message);
	};
	
	this.showPointPicker = function(cardElement){
		// check if already installed
		if($(cardElement).find('.picker').length) {
			if(debug)log("already installed!");
			return;
		}
	
		var pickers = '<span class="point-value">?</span> ';
		for (var i=0; i < pointSeq.length; i++) {
			if(debug)log(i+"::"+pointSeq[i]);
			pickers += '<span class="point-value">' + pointSeq[i] + '</span> ';
		}
		if(debug)log(pointSeq.length+" points installed in picker : "+pointSeqs);
		var picker = "<div class='picker'>" + pickers + "</div>";
		$(".card-detail-title .edit-controls").append(picker);
		pickerElement = picker;
		$(".point-value").click(that.updatePoint);
	};
	
	this.uninstall=function() {
		log("removing point picker");
		if (pickerElement != null) {
			$(pickerElement).unwrap();
			log("removed: point picker");
		}
		pickerElement = null;
	};
	
	this.updatePoint=function(){
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

	// only allow numbers, skip everything else...
	this.parsePointPickerFrom=function(text) {
		var stringArray= text.split(',');
		var pointsArray = [];
		for (var i=0; i < stringArray.length; i++) {
			var val = $.trim(stringArray[i]);
			if (tp.utils.isNumber(val)) {
				pointsArray.push(Number(val));
			}
		}
		if(debug)log("NUM::computed :"+pointsArray.length+" points from "+text);
		return pointsArray;
	};
	
	this.setSequence=function(sequence) {
		//TODO test tableau! underscore
		pointSeq = sequence;
	};
	
	this.toString = function() {
		return "Alphanumeric : "+pointSeq.toString();
	};
}