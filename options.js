// Saves options to localStorage.

function isDebug() {
	return localStorage["debug"];
}
function save_options() {
	console.log("in save_options: ");
	var debug = document.getElementById("debug");
	localStorage["debug"] = debug.checked;
	console.log("localStorage['debug']: " + localStorage["debug"]);
	
	var percent = document.getElementById("percent");
	localStorage["percent"] = percent.checked;
	console.log("localStorage['percent']: " + localStorage["percent"]);

	var filter_and_global = document.getElementById("filter_and_global");
	localStorage["filter_and_global"] = filter_and_global.checked;
	console.log("localStorage['filter_and_global']: "
			+ localStorage["filter_and_global"]);

	var pointsSequence=$('input[type=radio][name=pointsSequence]:checked').attr('value');
	localStorage["pointsSequence"] = pointsSequence;
	if (pointsSequence=="defaults") localStorage["pointsSequence-values"] = "0, 1, 2, 3, 5, 8, 13, 20";
	else if(pointsSequence=="fibonacci") localStorage["pointsSequence-values"] = "1, 2, 3, 5, 8, 13, 21, 34, 55";
	else if(pointsSequence=="tshirtsizes") localStorage["pointsSequence-values"] = "XXS, XS, S, M, L, XL, XXL, 3XL, 4XL, ?";
	else if(pointsSequence=="moscow") localStorage["pointsSequence-values"] = "W, C, S, M, ?";
	else localStorage["pointsSequence-values"] =$("#customPointSequence").val();
	
	var refreshRate = $("#refreshRate").val();
	if ( Number(refreshRate) >= 1) {
		localStorage["refreshRate"] = refreshRate;
	}
	$("#refreshRate").val(localStorage["refreshRate"]);
	
	console.log("localStorage['pointsSequence']: "
			+ localStorage["pointsSequence"]);
	console.log("localStorage['pointsSequence-values']: "
			+ localStorage["pointsSequence-values"]);
	console.log("localStorage['refreshRate']: "
			+ localStorage["refreshRate"]);

	showStatus("Options Saved.");
}

function showStatus(message) {
	var status = $("#status");
	var message = $("<a>").addClass("alert").addClass("alert-success").append(message).appendTo(status);
	setTimeout(function() {
		status.children().remove();
	}, 750);	
}

function restore_options() {
	console.log("restore_options: ");

	var debug = localStorage["debug"];
	console.log("debug: " + debug);
	if (debug == "true"|| debug == true) {	
		document.getElementById("debug").checked = "checked";
	} else {
		document.getElementById("debug").checked = "";
	}
	
	var percent = localStorage["percent"];
	console.log("percent: " + percent);
	if (percent == "true"|| percent == true) {
		document.getElementById("percent").checked = "checked";
	} else {
		document.getElementById("percent").checked = "";
	}
	var filter_and_global = localStorage["filter_and_global"];
	console.log("filter_and_global: " + filter_and_global);

	if (filter_and_global == "true"|| filter_and_global == true) {
		document.getElementById("filter_and_global").checked = "checked";
	} else {
		document.getElementById("filter_and_global").checked = "";
	}
	
	var pointsSequence = localStorage["pointsSequence"];
	var pointsSequencevalues = localStorage["pointsSequence-values"];
	console.log("pointsSequence: "+pointsSequence+" and "+pointsSequencevalues);
	$('input[type=radio][name=pointsSequence][value='+pointsSequence+']').attr('checked','checked');
	if (pointsSequence=="custom") {
		$("#customPointSequence").val(pointsSequencevalues);
	}
	
	var refreshRate = localStorage["refreshRate"];
	if(!isNumber(refreshRate)|| Number(refreshRate)<=0) {
		localStorage["refreshRate"]=2;
		refreshRate = localStorage["refreshRate"];
	}
	$("#refreshRate").val(refreshRate);
	
	console.log("restored");
}
function restoreDefaults() {
	localStorage["debug"]=false;
	localStorage["percent"]=true;
	localStorage["filter_and_global"]=true;
	localStorage["pointsSequence"]="defaults";
	localStorage.removeItem("pointsSequence-values");
	localStorage["refreshRate"]=2;
	
	showStatus("Default settings restored.");
	restore_options();

}
document.addEventListener('DOMContentLoaded', function() {
	restore_options();
	$("#saveButton").on("click", save_options);
	$("#restoreButton").on("click", restoreDefaults);
	
	$('.ttip').tooltip({delay: { show: 500, hide: 100 }});
});

function isNumber(text) {
	return !isNaN(Number(text));
};