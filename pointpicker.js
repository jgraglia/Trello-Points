
$(function(){
	$(".card-detail-title .edit-controls").live('DOMNodeInserted',showPointPicker);
});

//default story point picker sequence
// see options.html to change this
pointSeq = [0, 1, 2, 3, 5, 8, 13, 20];

function showPointPicker() {
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
	$(".point-value").click(updatePoint);
};

function updatePoint(){
	var value = $(this).text();
	var $text = $(".card-detail-title .edit textarea");
	if ($text.length==0) {
		alertBrokenAPI("Point Picker : text not found");
		return;
	}
	var text = $text.val();

	// replace our new
	$text[0].value=parser.parsePoints(text)?text.replace(reg, '('+value+') '):text+' ('+value+')';

	// then click our button so it all gets saved away
	$(".card-detail-title .edit .js-save-edit").click();

	return false;
};

function parsePointPickerFrom(text) {
	stringArray= text.split(',');
	pointsArray = [];
	for (var i=0; i < stringArray.length; i++) {
		var val = $.trim(stringArray[i]);
		if(utils.isNumber(val)) {
			pointsArray.push(Number(val));
		}
	}
	return pointsArray;
}