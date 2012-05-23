/*
** Trello Points v? - https://github.com/jgraglia/Trello-Points
** Enhance Trello's cards with freely configurable points
**
** You can install the extension at:
**         https://chrome.google.com/webstore/detail/mkcpchladphoadhaclmnlphhijboljjk/details
** 
** Rework from Trello Scrum v.0.53 extension : 
**    Idea & Documentation:
**      Jasper Kaizer <https://github.com/jkaizer>
**    Orig:
**      Marcel Duin <https://github.com/marcelduin>
** Contribs:
**      Paul Lofte <https://github.com/paullofte>
**      Nic Pottier <https://github.com/nicpottier>
**      Bastiaan Terhorst <https://github.com/bastiaanterhorst>
**      Morgan Craft <https://github.com/mgan59>
*/

var iconUrl = chrome.extension.getURL('images/points-icon.png');

//non programmatic debug (vs. debug settings available from options page)
var debug = {
	card: false,
	list:false,
	filter:false
};
var filter = new Filter(debug.filter);

var tp =  new Object();
tp.utils = new Utils();
tp.pointPicker = new AlphaNumericPointPicker(); 
tp.settingsLoader = new SettingsLoader();

var modes=new Object();
$(function(){
	"use strict";

	$(".card-detail-title .edit-controls").live('DOMNodeInserted',showCurrentPointPicker);
	
	tp.settingsLoader.checkTrelloScrum();

	modes.percent = true;
	modes.filter_and_global = true;
	modes.refreshRate=2;
	(function periodical() {
		$('.list-card').each(updateCard);
		$('.list').each(updateList);
		
		try {
			tp.settingsLoader.reloadSettings(modes, function() {
				tp.pointPicker.uninstall();
				if (modes.pointsSequence === "defaults" || modes.pointsSequence === "fibonacci") {
					tp.pointPicker = new NumericPointPicker(); 
					console.log("num");
				}else {
					tp.pointPicker = new AlphaNumericPointPicker();
					console.log("alpha"); 
				}
				tp.pointPicker.setSequence(tp.pointPicker.parsePointPickerFrom(modes.pointsSequenceValues));
				console.log("Point picker component updated: "+tp.pointPicker);
			});
		} catch (err) {
			tp.utils.log(err);
			tp.utils.alertBrokenAPI("Unable to reload Trello Points settings (0x5)");
		}
		var nextRefreshIn = modes.refreshRate;
		if(!tp.utils.isNumber(nextRefreshIn) || Number(nextRefreshIn)<1) nextRefreshIn=2;
		setTimeout(periodical,nextRefreshIn*1000);
	})();
});

var log = function(message) {
	tp.utils.log("Main", message);
};

function showCurrentPointPicker() {
	tp.pointPicker.showPointPicker(this);
}
function updateCard(event) {
	var card = new Card($(this), debug.card);
	if (debug.card) {
		log("Listing card & event: ");
		log(card);
		log(event);
	}
	var cardPoints = card.computePoints();
	if (debug.card) {
		log("card points : >"+cardPoints+"<");
	}
	if (cardPoints) {
		if (debug.card) log("card has points.. updating badge");
		card.updateBadge(cardPoints);
	} else {
		if (debug.card) {
			log("card has no points.. removing badge");
		}
		card.removeBadge();
	}
};

function updateList(event) {
	var list = new List($(this), filter, debug.list);
	var scores= list.computeScores();
	if (scores.filtered) {
		list.insertScoresInTitle(scores, modes);
	}else {
		list.removeScoresFromTitle();
	}
}
